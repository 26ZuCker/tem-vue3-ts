const arr = [];
const obj = {};
/**
 * 最简单深拷贝，缺点：
 * 1.忽略symbol，undefined
 */
const $deepClone1 = (tar: any) => JSON.parse(JSON.stringify(tar));
/**
 * es5递归实现深拷贝，loadash 中的 cloneDeep
 * 虽然这种做法能解决JSON深拷贝的局限是对于庞大的数据来说性能并不好，因为需要把整个对象都遍历一遍
 */
const $deepClone2 = (tar: any) => {
  //null则直接返回
  if (tar === null || typeof tar !== 'object') {
    return tar;
  }
  //其余基本类型则直接返回
  if (typeof tar !== 'object' || typeof tar !== 'function') {
    return tar;
  }
  //RegExp或Date则new再返回
  if (tar instanceof RegExp) {
    return new RegExp(tar);
  }
  if (tar instanceof Date) {
    return new Date(tar);
  }
  //
  const res = new tar.constructor();
};
/**
 * es6递归实现深拷贝，参考https://mp.weixin.qq.com/s/hCz4lXPy0UhQ9nCFh83F4g
 * @param tar
 * @param wmap
 */
const $es6DeepClone2 = (tar: any, wmap = new WeakMap()) => {};
/**
 * es6通过proxy实现，参考https://juejin.cn/post/6844904021627502599
 * @param tar 拷贝源
 * @param fn 拷贝源的基础上需要修改的属性，不会影响源
 * @example
 * const data = produce(state, (draftState) => {
  draftState.info.age = 26;
  draftState.info.career.first.name = '222';
  });
 */
const $deepClone3 = (tar: any, fn: (...rest: any[]) => void) => {
  const proxies = new Map();
  const copies = new Map();

  const MY_IMMER = Symbol('my-immer1');

  const isPlainObject = (value: any) => {
    if (!value || typeof value !== 'object' || {}.toString.call(value) != '[object Object]') {
      return false;
    }
    var proto = Object.getPrototypeOf(value);
    if (proto === null) {
      return true;
    }
    var Ctor = Object.hasOwnProperty.call(proto, 'constructor') && proto.constructor;
    return (
      typeof Ctor == 'function' &&
      Ctor instanceof Ctor &&
      Function.prototype.toString.call(Ctor) === Function.prototype.toString.call(Object)
    );
  };

  const isProxy = (value: any) => !!value && !!value[MY_IMMER];

  const objectTraps = {
    get(tar: any, key: string | symbol) {
      if (key === MY_IMMER) return tar;
      const data = copies.get(tar) || tar;
      return getProxy(data[key]);
    },
    set(tar: any, key: string | symbol, val: any) {
      const copy = getCopy(tar);
      const newValue = getProxy(val);
      // 这里的判断用于拿 proxy 的 tar
      // 否则直接 copy[key] = newValue 的话外部拿到的对象是个 proxy
      copy[key] = isProxy(newValue) ? newValue[MY_IMMER] : newValue;
      return true;
    },
  };

  const getProxy = (data) => {
    if (isProxy(data)) {
      return data;
    }
    if (isPlainObject(data) || Array.isArray(data)) {
      if (proxies.has(data)) {
        return proxies.get(data);
      }
      const proxy = new Proxy(data, objectTraps);
      proxies.set(data, proxy);
      return proxy;
    }
    return data;
  };

  const getCopy = (data) => {
    if (copies.has(data)) {
      return copies.get(data);
    }
    const copy = Array.isArray(data) ? data.slice() : { ...data };
    copies.set(data, copy);
    return copy;
  };

  const isChange = (data) => {
    if (proxies.has(data) || copies.has(data)) return true;
  };

  const finalize = (data) => {
    if (isPlainObject(data) || Array.isArray(data)) {
      if (!isChange(data)) {
        return data;
      }
      const copy = getCopy(data);
      Object.keys(copy).forEach((key) => {
        copy[key] = finalize(copy[key]);
      });
      return copy;
    }
    return data;
  };

  const proxy = getProxy(tar);
  fn(proxy);
  return finalize(tar);
};
export { $deepClone1, $deepClone2, $deepClone3 };

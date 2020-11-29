const arr = [];
const obj = {};
/**
 * 最简单深拷贝，缺点：
 * 1.忽略symbol，undefined
 */
const deepClone1 = (target: any) => JSON.parse(JSON.stringify(target));
/**
 * es5递归实现深拷贝，loadash 中的 cloneDeep，参考https://mp.weixin.qq.com/s/hCz4lXPy0UhQ9nCFh83F4g
 * 虽然这种做法能解决JSON深拷贝的局限是对于庞大的数据来说性能并不好，因为需要把整个对象都遍历一遍
 */
const deepClone2 = (target: any) => {
  //null则直接返回
  if (target === null) {
    return null;
  }
  //其余基本类型则直接返回
  if (typeof target !== 'object' || typeof target !== 'function') {
    return target;
  }
  //RegExp或Date则new再返回
  if (target instanceof RegExp) {
    return new RegExp(target);
  }
  if (target instanceof Date) {
    return new Date(target);
  }
  //
  const res = new target.constructor();
};
/**
 * es6通过proxy实现，参考https://juejin.cn/post/6844904021627502599
 * @param target 拷贝源
 * @param fn 拷贝源的基础上需要修改的属性，不会影响源
 * @example
 * const data = produce(state, (draftState) => {
  draftState.info.age = 26;
  draftState.info.career.first.name = '222';
  });
 */
const deepClone3 = (target: any, fn: () => void) => {
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
    get(target: any, key: string | symbol) {
      if (key === MY_IMMER) return target;
      const data = copies.get(target) || target;
      return getProxy(data[key]);
    },
    set(target: any, key: string | symbol, val: any) {
      const copy = getCopy(target);
      const newValue = getProxy(val);
      // 这里的判断用于拿 proxy 的 target
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

  const proxy = getProxy(target);
  fn(proxy);
  return finalize(target);
};
export { deepClone1, deepClone2, deepClone3 };

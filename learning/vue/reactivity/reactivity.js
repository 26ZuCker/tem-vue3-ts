/**
 * 全局依赖
 */
const tarMap = new WeakMap();
/**
 * 保存所有的effect即副作用
 */
const effectStack = [];
/**
 * 收集依赖，存储的目标结构如下
 * {
 * tar:{key:[effect1, effect2]}
 * }
 * @param {*} tar
 * @param {*} key
 */
const track = (tar, key) => {
  tarMap.has(key);
};
const baseHandler = {
  get(tar, key) {
    track(tar, key);
    const ret = Reflect.get(tar, key);
    //递归且Reflect获取
    //需要收集依赖置于全局hash内
    return typeof ret === 'object' ? reactive(ret) : ret;
  },
  set(tar, key, val) {
    // const info = { oVal:   };
    Reflect.set(tar, key, val);
  },
};
const reactive = (tar) => {
  /**
   * 被观察者
   */
  const observed = new Proxy(tar, baseHandler);
};

const computed = () => {};

const effect = () => {};

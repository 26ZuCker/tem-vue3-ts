//辅助类型
type helper = void | Promise<string | void>;
//辅助函数
const helper = (cb: () => void, async = false): helper => {
  if (async) {
    return new Promise((resolve, reject) => {
      try {
        cb();
        return resolve();
      } catch (error) {
        return reject(error);
      }
    });
  }
  try {
    cb();
  } catch (error) {
    console.log(error);
  }
};
/**
 * 返回localStorage缓存，默认同步
 * @param key
 * @param async
 */
const getStorage = (key: string, async = false): helper => {
  const cb = () => {
    window.localStorage.getItem(key);
  };
  return helper(cb, async);
};
/**
 * 移除localStorage缓存，默认同步
 * @param key
 * @param async
 */
const removeStorage = (key: string, async = false): helper => {
  const cb = () => {
    window.localStorage.removeItem(key);
  };
  return helper(cb, async);
};
/**
 * 设置localStorage缓存，默认同步
 * @param key
 * @param value
 * @param async
 */
const setStorage = (key: string, value: any, async = false): helper => {
  const cb = () => {
    window.localStorage.setItem(key, value);
  };
  return helper(cb, async);
};
export { getStorage, removeStorage, setStorage };

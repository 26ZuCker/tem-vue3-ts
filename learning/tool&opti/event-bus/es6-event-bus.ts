function isFunc(fn) {
  return typeof fn === 'function';
}
function str(s) {
  if (s == null) {
    return null;
  }
  s = s.replace(/^\s+|\s+$/g, '');
  return s.length > 0 ? s.toLowerCase() : null;
}
/**
 * 订阅者
 */
class Handler {
  fns: any[];
  datas: any[];
  constructor() {
    this.fns = [];
    this.datas = [];
  }
  /**
   * 添加事件
   * @param {*} fn
   * @param {*} data
   */
  add(fn, data) {
    this.fns.push(fn);
    this.datas.push(data);
  }
  /**
   * 移除事件
   * @param {*} fn
   */
  remove(fn) {
    const i = this.fns.indexOf(fn);
    if (i >= 0) {
      this.fns.splice(i, 1);
      this.datas.splice(i, 1);
    }
  }
  /**
   * 触发事件
   * @param {*} sender
   * @param {*} data
   */
  invoke(sender, data) {
    this.fns.forEach((fn, i) => {
      try {
        fn(sender, data, this.datas[i]);
      } catch (error) {
        console.error(error);
      }
    });
  }
}
/**
 * 发布者
 * event bus本质即发布订阅模式，该类为发布者，Handler为订阅者
 */
class EventBus {
  handers: WeakMap<any, any>;
  constructor() {
    /**
     * 需要频繁增删属性则采用map效率由于object
     * 不需要对数据进行所以采用weak
     */
    this.handers = new WeakMap();
  }
  /**
   * 监听
   * @param {*} eventName
   * @param {*} fnOrData
   * @param {*} fn
   */
  on(eventName, fnOrData, fn) {
    eventName = str(eventName);
    if (eventName == null) {
      throw new Error('事件名无效');
    }
    if (!isFunc(fn)) {
      const temp = fn;
      fn = fnOrData;
      fnOrData = temp;
      throw new Error('必须提供事件函数');
    }
    let handle = this.handers.get(eventName);
    if (handle == null) {
      handle = new Handler();
      this.handers.set(eventName, handle);
    }
    handle.add(fn, fnOrData);
  }
  /**
   * 只监听一次
   * 与on的差别只是将off注入回调内而已
   * @param {*} eventName
   * @param {*} fnOrData
   * @param {*} fn
   */
  once(eventName, fnOrData, fn) {
    eventName = str(eventName);
    if (eventName == null) {
      throw new Error('事件名无效');
    }
    if (!isFunc(fn)) {
      const temp = fn;
      fn = fnOrData;
      fnOrData = temp;
      throw new Error('必须提供事件函数');
    }
    let handle = this.handers.get(eventName);
    if (handle == null) {
      handle = new Handler();
      this.handers.set(eventName, handle);
    }
    const newFn = (...args) => {
      fn(...args);
      this.off(eventName, fn);
    };
    handle.add(newFn, fnOrData);
  }
  /**
   * 解绑
   * @param {*} eventName
   * @param {*} fn
   */
  off(eventName, fn) {
    eventName = str(eventName);
    if (eventName == null) {
      return;
    }
    const handle = this.handers.get(eventName);
    if (handle != null) {
      if (fn == null) {
        this.handers.delete(eventName);
      } else {
        handle.remove(fn);
      }
    }
  }
  /**
   * 触发
   * 别名：fire，emit
   * @param {*} eventName
   * @param {*} sender
   * @param {*} data
   */
  emit(eventName, sender, data) {
    eventName = str(eventName);
    if (eventName === null) {
      return;
    }
    const handle = this.handers.get(eventName);
    if (handle !== null) {
      handle.invoke(sender, data);
    }
  }
}

export default EventBus;

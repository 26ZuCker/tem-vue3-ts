/**
 * 发布订阅模式，此处采用ts即基于es6语法
 */
class EventEmitter {
  private events: Map<string, (...rest: any[]) => any>;
  constructor() {
    this.events = new Map();
  }
  /**
   * 监听
   * @param _eventName 事件名
   * @param _listener
   */
  $on(_eventName: string, _listener: (...rest: any[]) => any) {
    if (this.events.has(_eventName)) {
      return;
    }
    this.events.set(_eventName, _listener);
  }
  /**
   * 一次性监听
   * @param _eventName
   * @param _listener
   */
  $once(_eventName: string, _listener: (...rest: any[]) => any) {
    if (this.events.has(_eventName)) {
      return;
    }
    const cb = () => {
      _listener();
      this.$off(_eventName, _listener);
    };
    this.events.set(_eventName, cb);
  }
  /**
   * 触发
   * @param _eventName
   * @param args 以数组形式传入参数，在参数少的情况下call性能优于apply
   */
  $emit(_eventName: string, args?: any[] | any) {
    this.events.forEach((v) => {
      v(args);
    });
  }
  /**
   * 移除监听
   * @param _eventName
   * @param _listener
   */
  $off(_eventName: string, _listener: (...rest: any[]) => any) {
    if (!this.events.has(_eventName)) {
      return;
    }
    this.events.delete(_eventName);
  }
  /**
   * 移除所有监听
   * @param _eventName
   */
  $allOff(_eventName: Array<string>) {
    this.events.clear();
  }
}

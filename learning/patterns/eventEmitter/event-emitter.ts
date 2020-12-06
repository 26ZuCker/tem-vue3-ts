/**
 * ts基于es6语法
 */
class EventEmitter {
  events: Map<any, any>;
  constructor() {
    this.events = new Map();
  }
  /**
   *
   * @param eventName 事件名
   * @param listener
   */
  $on(eventName: string, listener: () => any) {
    return this;
  }
  /**
   *
   * @param eventName
   * @param listener
   */
  $once(eventName: string, listener: () => any) {
    return this;
  }
  /**
   *
   * @param eventName
   * @param args 以数组形式传入参数，在参数少的情况下call性能优于apply
   */
  $emit(eventName: string, args?: Array<any> | any) {
    return this;
  }
  /**
   *
   * @param eventName
   * @param listener
   */
  $off(eventName: string, listener: () => any) {
    return this;
  }
  /**
   *
   * @param eventName
   */
  $allOff(eventName: Array<string>) {}
}

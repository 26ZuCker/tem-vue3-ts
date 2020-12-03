/* interface i_EventEmitter {
  events: Map<any, any>;
  $on: (eventName: string, listener: () => any) => object;
  $once: (eventName: string, listener: () => any) => object;
  $emit: (eventName: string, args?: Array<any> | any) => object;
  $off: (eventName: string, listener: () => any) => object;
  $allOff: (eventName: Array<string>) => void;
} */
class EventEmitter {
  events: Map<any, any>;
  constructor() {
    this.events = new Map();
  }
  $on(eventName: string, listener: () => any) {
    return this;
  }
  $once(eventName: string, listener: () => any) {
    return this;
  }
  $emit(eventName: string, args?: Array<any> | any) {
    return this;
  }
  $off(eventName: string, listener: () => any) {
    return this;
  }
  $allOff(eventName: Array<string>) {}
}

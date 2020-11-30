interface i_TimeStore {
  store: Map<any, any>;
  isActive: boolean;
  addTimer(timer: any): number;
  show(): void;
  hide(): void;
  clear(id: number): void;
}
interface c_TimerStore {
  new (): i_TimeStore;
}
export { i_TimeStore, c_TimerStore };
class TimerStore implements i_TimeStore {
  store: Map<any, any>;
  isActive: boolean;
  constructor() {
    this.store = new Map();
    this.isActive = true;
  }
  addTimer(timer: any) {
    this.store.set(timer.id, timer);
    this.isActive && timer.start(this.store);
    return timer.id;
  }
  show() {
    /* 没有隐藏，不需要恢复定时器 */
    if (this.isActive) return;
    this.isActive = true;
    this.store.forEach((timer) => timer.start(this.store));
  }

  hide() {
    this.store.forEach((timer) => timer.suspend());
    this.isActive = false;
  }

  clear(id: number) {
    const timer = this.store.get(id);
    if (!timer) return;

    clearTimeout(timer.timerId);
    timer.timerId = '';
    this.store.delete(id);
  }
}
export default TimerStore;

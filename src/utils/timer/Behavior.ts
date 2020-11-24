import { Timer } from './timer';
import { i_TimeStore, c_TimerStore } from './Store';
import { onMounted, onUnmounted } from 'vue';
import newObj from './index';

const TimerBehavior = (TimerStore: i_TimeStore, isMiniProgram = false): obj => {
  const nowMounted = onMounted(() => {
    this.$timerStore = newObj(TimerStore);
  });
  const nowUnmounted = onUnmounted(() => {
    this.$timerStore.hide();
  });
  const onShow = () => {
    this.$timerStore.show();
  };
  const onHide = () => {
    this.$timerStore.hide();
  };
  const $setTimeout = (fn = () => {}, timeout = 0, ...arg: _rest) => {
    const timer = new Timer(false, fn, timeout, ...arg);
    return this.$timerStore.addTimer(timer);
  };
  const $setInterval = (fn = () => {}, timeout = 0, ...arg: _rest) => {
    const timer = new Timer(true, fn, timeout, ...arg);
    return this.$timerStore.addTimer(timer);
  };
  const $clearInterval = (id: number) => {
    this.$timerStore.clear(id);
  };
  const $clearTimeout = (id: number) => {
    this.$timerStore.clear(id);
  };
  const res: obj = {
    lifeHooks: {
      nowMounted,
      nowUnmounted,
    },
    methods: { $setTimeout, $setInterval, $clearTimeout, $clearInterval },
  };
  if (isMiniProgram) {
    res['lifeHooks']['onShow'] = onShow;
    res['lifeHooks']['onHide'] = onHide;
  }
  return res;
};

export default TimerBehavior;

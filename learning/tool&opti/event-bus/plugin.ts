import { App } from 'vue';
import E from './es6-event-bus';

/**
 * 单例实现
 */
const eb = new E();

export default {
  install: (app: App, ...options: any[]) => {
    app.mixin({
      created() {},
      mounted() {},
      beforeUnmount() {},
    });
    app.provide('event_bus', eb);
  },
};

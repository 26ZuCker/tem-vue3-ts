import Vue from 'vue';
import EventBus from './es6-event-bus.js';

//直接挂载到全局变量上即可
const instance = new EventBus();
Vue.prototype.$EventBus = instance;

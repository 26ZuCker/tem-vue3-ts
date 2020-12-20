// lp-popover.js
import lpPopover from './lp-popover.vue';
import { defineComponent, createVNode, render, toRaw } from 'vue';

// 定义组件
const popoverConstructor = defineComponent(lpPopover);

export default function createPopover(app) {
  // 在全局上注册自定义指令v-popover
  app.directive('popover', {
    // 在元素挂载后调用
    mounted(el, binding) {
      // 获取外界传入的指令的值，例如v-popover="data"，value获取的就是data对应的值
      let { value } = binding;

      let options = toRaw(value);
      // 判断传入的参数是否为对象
      if (!Object.prototype.toString.call(options) === '[Object Object]') {
        console.error('Please enter an object as a parameter');
      }

      options = options ? options : {};

      const popoverInstance = createVNode(popoverConstructor, options);
      const container = document.createElement('div');
      render(popoverInstance, container);
      el.appendChild(popoverInstance.el);
      const props = popoverInstance.component.props;
      // 通过我们传入的参数对组件进行数据的初始化
      Object.keys(options).forEach((v) => {
        props[v] = options[v];
      });
    },
  });
}

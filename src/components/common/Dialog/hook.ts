import lp_dialog from './lp-dialog.vue';
import { defineComponent, createVNode, render, toRef, watch } from 'vue';

const confirmConstructor = defineComponent(lp_dialog);

export const createDialog = (options) => {
  if (Object.prototype.toString.call(options) !== '[Object Object]') {
    console.error('Please enter an object as a parameter');
  }

  options = options ? options : {};

  // 生成组件实例
  const instance = createVNode(confirmConstructor, options);

  // 渲染挂载组件
  const container = document.createElement('div');
  render(instance, container);
  document.querySelector('#app')!.appendChild(instance.el);

  // 初始化组件参数
  const props = instance.component.props;
  Object.keys(options).forEach((key) => {
    props[key] = options[key];
  });
  // 获取组件的 status 状态变量
  const status = toRef(instance.component.setupState, 'status');

  // 返回 promise，方便外部调用
  return new Promise((resolve, reject) => {
    // 监听组件的按钮点击情况
    watch(status, (now) => {
      if (now == 0) reject();
      else if (now == 1) resolve();
    });
  });
};

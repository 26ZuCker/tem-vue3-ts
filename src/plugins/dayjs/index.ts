import { App, h } from 'vue';
/**
 * 集成dayjs插件
 * 使用：app.use(plugin-name, options)
 * 常用属性：provide，mixin
 * 不建议挂载全局属性，即使该属性使用频繁
 */
export default {
  install: (app: App, ...options: any[]) => {
    const a = options.fill(3);
    //插件用户现在可以将 inject[dayjs] 到他们的组件并访问a
    app.provide('dayjs', a);
    //混入
    app.mixin({
      created() {},
    });
    app.component('left', {
      render() {
        return h('div');
      },
    });
    //挂载全局属性
    app.config.globalProperties.$formatTime = () => {};
    //自定义指令
    app.directive('my-dayjs', {});
  },
};

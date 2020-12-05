import { App } from 'vue';
import component from './component';
import directive from './directive';
import hook from './hook';
/**
 * 集成dayjs插件
 * 使用：app.use(plugin-name, options)
 * 常用属性：provide，mixin
 * 不建议挂载全局属性，即使该属性使用频繁
 */
export default {
  install: (app: App, ...options: any[]) => {
    //自定义指令
    app.directive('right-click', directive);
    //自定义组件
    app.component('RCMenu', component(hook));
  },
};

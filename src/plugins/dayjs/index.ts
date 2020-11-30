import { App, Plugin } from 'vue';
/**
 * 集成dayjs插件
 * 使用：app.use(plugin-name, options)
 */
export default {
  install: (app: App, options: any) => {
    //app.provide('dayjs', options);
    app.directive('my-dayjs', {});
    app.mixin({
      created() {},
    });
  },
};

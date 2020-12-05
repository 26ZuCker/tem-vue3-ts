import { App } from 'vue';
import download from './download';
import upload from './upload';
/**
 * 集成dayjs插件
 * 使用：app.use(plugin-name, options)
 * 常用属性：provide，mixin
 * 不建议挂载全局属性，即使该属性使用频繁
 */
export default {
  install: (app: App, ...options: any[]) => {
    app.mount;
    const { downloadOptions, uploadOptions } = options;
    app.provide('download', download(downloadOptions));
    app.provide('upload', upload(uploadOptions));
  },
};

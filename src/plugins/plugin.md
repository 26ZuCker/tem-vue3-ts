@vue/[plugin] 开发

参考https://juejin.cn/post/6901466994478940168

目的：以 vue 实例为单位添加全局函数或属性并可以将他们作为该插件的 api 或直接注入 vue 实例内

```js
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
    //挂载全局属性
    app.config.globalProperties.$formatTime = () => {};
    //自定义指令
    app.directive('my-dayjs', {});
  },
};
```

通过插件注入方法和直接以 esm 方式导入方法选择：

#### 数字动画

#### 代码高亮

#### 大文件上传（切片、断点续传、秒传）需要与后端配合

#### 图片预览

#### Excel 导入导出

#### 富文本编辑器

#### Markdown 编辑器

#### 代码编辑器

配置本地环境

1. 全局安装 ts 以命令行识别 tsc 指令
2. 局部安装 ts 以当前项目的各依赖库能使用 ts 语法
3. 初始化环境 `tsc --init`
4. 生成 package `npm init`
5. 直接编译为 js 文件并输出当同级目录下，注意第二个字符串为相对于 tsconfig.json 的入口文件 `tsc ./index.ts`

特点

- es6 及以上的超集
- 类型注解和声明
- 接口
- 装饰器

#### 索引签名

可以为 interface，class 添加

使用`void 0`代替`undefined`，参考https://juejin.cn/post/6844903796973830158

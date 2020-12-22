## babel

参考https://juejin.cn/post/6844903797571977223

配置方式：

1. .babelrc：建议使用 babel.config.js 代替
2. babel.config.js

```js
//babel.config.js
module.exports = {
  cacheDirectory: true,
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: [
            'last 2 versions',
            'Firefox ESR',
            '> 1%',
            'ie >= 11',
            'iOS >= 8',
            'Android >= 4',
          ],
        },
      },
    ],
    '@babel/preset-typescript',
    '@vue/cli-plugin-babel/preset',
    //'es2015',
    //'react',
    //'stage-0',
  ],
  plugins: [
    //为ant-design-vue配置babel-plugin-import
    [
      'import',
      {
        libraryName: 'ant-design-vue',
        styleLibraryName: 'theme-chalk',
      },
    ],
    //为使用jsx语法配置
    [
      '@vue/babel-plugin-jsx',
      {
        optimize: true,
      },
    ],
  ],
};
```

3. webpack.config.js 内配置

```js
const babelConfig = {
  //...如上配置babel.config.js
};
module.exports = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: babelConfig,
          },
          {
            loader: 'ts-loader',
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /pickr.*js/,
        options: babelConfig,
      },
    ],
  },
};
```

### preset

stage-n 属于一种以前使用的 preset，共有 0~3 四种，stage-0 是对 ES7 一些提案的支持，0 所含的插件为后三者的超集，序号逐层同理，其中 stage3 包含以下两个插件：

- transform-async-to-generator
- transform-exponentiation-operator

但对于 babel7 而言 stage-0 已经作为不推荐使用的 preset 了而是@babel/preset-env 即让 babel 拥有根据你的环境传入参数来编译不同代码的需求，配置参数参考下方

#### @babel/preset-env

常用可配置参数：

- targets

  1.  让 babel 根据写入的兼容平台来做代码转换
  2.  具体参数参考https://github.com/browserslist/browserslist

- useBuiltIns

  1. 某些 api 在某些浏览器其实是不支持的，babel 默认的转换对于这种场景并不会做处理，同样不会处理的包括 WeakMap, WeakSet, Promise 等 es6 新引入的类，所以需要 babel-polyfill 为我们这些实例方法等等打上补丁

```js
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          browsers: [
            'last 2 versions',
            'Firefox ESR',
            '> 1%',
            'ie >= 11',
            'iOS >= 8',
            'Android >= 4',
          ],
        },
        useBuiltIns: 'usage',
      },
    ],
  ],
};
```

### plugin

preset 即 plugin 的集合

#### @babel/plugin-transform-runtime

帮我们把一些 babel 的辅助方法由直接写入代码专为按需引入模块的方式引用

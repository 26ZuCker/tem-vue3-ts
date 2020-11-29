/**
 * 执行webpack构建的入口文件，index.js是源码即需要打包的项目的入口文件
 * 1.获取打包配置
 */
const options = require('./webpack.config.js');
const Webpack = require('./lib/webpack.js');

const webpack = new Webpack(options);

webpack.run();

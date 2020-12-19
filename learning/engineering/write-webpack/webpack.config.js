const path = require('path');

/**
 * dist：存放打包文件
 * lib：webpack打包所需类
 * src：打包入口文件
 * bundle.js：webpack启动入口
 */
module.exports = {
  entry: './src/index.js',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'main.js',
  },
};

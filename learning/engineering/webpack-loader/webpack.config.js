const path = require('path');

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js',
  },
  /**
   * 告诉webpack解析npm包时应该搜索的目录，优先级与loader执行顺序相反即从首至尾
   * 注意需要为整个文件名
   * modules：相当于引入第三方npm模块，如'loaderB'，注意要具体到入口文件
   */
  resolveLoader: {
    modules: ['node_modules', './loaders'],
  },
  module: {
    rules: [
      //处理js
      {
        test: /\.js$/,
        //使用单一loader且不需要传递参数推荐
        //use: path.resolve(__dirname, './my-loader/index.js'),
        //需要传递参数必须以该方式，且可以多个loader，注意执行顺序从尾至首
        use: [
          //由于resolveLoader.modules内注入其上一级文件夹此处可以只使用文件名
          //path.resolve(__dirname, './loaderB/index.js'),
          'loaderB',
          {
            loader: 'loaderA',
            options: {
              name: 'zeng',
            },
          },
        ],
      },
      //处理scss
      {
        test: /\.scss$/,
        use: [
          {
            loader,
            options: {},
          },
        ],
      },
    ],
  },
};

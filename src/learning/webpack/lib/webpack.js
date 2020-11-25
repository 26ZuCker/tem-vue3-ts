const fs = require('fs');
/**
 * 当前项目所使用的路径都必须是相对于项目的根目录的相对路径，而非相对于开发者文件夹的绝对路径
 * 即webpack.config.js内配置的路径名如./a.js => ./src/a.js
 */
const path = require('path');
const parser = require('@babel/parser');
//注意新版本需要使用其default导出的方法
const traverse = require('@babel/traverse').default;
const { transformFromAst } = require('@babel/core');

/**
 * 执行webpack打包的所有依赖库的入口文件，不是所需打包的源文件的入口文件
 */
module.exports = class Webpack {
  constructor(options) {
    const { entry, output } = options;
    this.entry = entry;
    this.output = output;
    /**
     * 缓存以递归分析的模块
     */
    this.modules = [];
  }
  /**
   * 启动函数
   */
  run() {
    //分析入口模块
    const info = this.parse(this.entry);
    this.modules.push(info);
    //递归分析各个模块的依赖dependencies
    for (let i = 0; i < this.modules.length; i++) {
      const item = this.modules[i];
      const { dependencies } = item;
      if (dependencies) {
        for (const key in dependencies) {
          const info = this.parse(dependencies[key]);
          this.modules.push(info);
        }
      }
    }
    console.log(this.modules);
  }
  /**
   * 分析入口文件
   * 1.转换源代码为ast
   * 2.获取ast中模块相关代码
   * 3.获取ast中执行语句相关代码
   */
  parse(entryUrl) {
    //通过node原生模块fs得到文件
    const entryFile = fs.readFileSync(entryUrl, 'utf-8');
    //通过@babel/parser解析以获取ast
    const ast = parser.parse(entryFile, {
      sourceType: 'module',
    });
    /**
     * 保存依赖及其相对项目的根目录路径
     */
    const dependencies = {};
    //通过@babel/traverse遍历ast以对其进行增删改查操作，具体使用参考官方文档
    //第二个参数传递需要处理的[`${node.Type}`](options){...处理该类型节点的参数}
    traverse(ast, {
      ImportDeclaration({ node }) {
        const filePath = path.join(path.dirname(entryUrl), node.source.value);
        dependencies[node.source.value] = filePath;
      },
    });
    //获取非模块化的代码，具体转换规则保存在@babel/preset-env内
    const { code } = transformFromAst(ast, null, {
      presets: ['@babel/preset-env'],
    });
    return {
      entryUrl,
      dependencies,
      code,
    };
  }
};

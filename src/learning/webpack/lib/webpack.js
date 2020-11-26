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
 * 借助babel模拟webpack打包过程
 * 执行webpack打包的所有依赖库的入口文件，不是所需打包的源文件的入口文件
 */
module.exports = class Webpack {
  constructor(options) {
    const { entry, output } = options;
    /**入口 */
    this.entry = entry;
    /**出口 */
    this.output = output;
    /**缓存以递归分析的模块 */
    this.modules = [];
  }
  /**
   * 启动函数
   * 1.通过使用babel的parse()先从入口文件开始解析
   * 2.然后从已经解析的入口文件module的依赖开始逐个解析他们的依赖
   * 3.将所有存入this.modules转换为对象allModules
   * 4.将allModules转换为bundle即写入
   */
  run() {
    //分析入口模块
    const info = this.parse(this.entry);
    this.modules.push(info);
    //递归分析各个模块的依赖dependencies，注意由于该迭代内部可能改变modules内元素个数所以不能直接取出modules.length
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
    //转换modules数组为对象
    const allModules = {};
    this.modules.forEach((item) => {
      allModules[item.entryPath] = {
        dependencies: item.dependencies,
        code: item.code,
      };
    });
    this.file(allModules);
  }
  /**
   * 分析入口文件
   * 1.转换源代码为ast
   * 2.获取ast中模块相关代码
   * 3.获取ast中执行语句相关代码
   * @param entryPath 入口文件相对于webpack的执行入口文件的目录
   */
  parse(entryPath) {
    /**通过node原生模块fs得到文件 */
    const entryFile = fs.readFileSync(entryPath, 'utf-8');
    /**通过@babel/parser解析以获取ast */
    const ast = parser.parse(entryFile, {
      sourceType: 'module',
    });
    /**保存依赖及其相对项目的根目录路径 */
    const dependencies = {};
    //通过@babel/traverse遍历ast以对其进行增删改查操作，具体使用参考官方文档
    //第二个参数传递需要处理的[`${node.Type}`](options){...处理该类型节点的参数}
    traverse(ast, {
      ImportDeclaration({ node }) {
        //需要将各个模块内的依赖文件的相对路径转换成绝对路径，注意此处所有的绝对路径都是入口文件的相对路径
        //'./a.js' -> './src/a.js'
        const absolutePath = path.join(path.dirname(entryPath), node.source.value);
        dependencies[node.source.value] = absolutePath;
      },
    });
    //获取非模块化的代码，具体转换规则保存在@babel/preset-env内
    const { code } = transformFromAst(ast, null, {
      presets: ['@babel/preset-env'],
    });
    return {
      entryPath,
      dependencies,
      code,
    };
  }
  /**
   * 1.创建IIFE且处理exports，module，require
   * 2.生成./dist/main.js
   * @param {object} allModules
   */
  file(allModules) {
    /**获取出口即dist */
    const filePath = path.join(this.output.path, this.output.filename);
    /**该项目src中所有的module */
    const newAllModules = JSON.stringify(allModules);
    /**
     * 以模板字符串形式的IIFE写入bundle，注意;尽量不要省略以避免压缩出错
     */
    const bundle = `(function(graph){
      //处理require
      function require(module){
        /**
         * 处理module内部的路径'./a.js'为相对于项目入口文件的绝对路径
         * 取出保存在单个module经过parse后的dependencies并通过闭包实现递归require
         */
        function reRequire(relativePath){
          return require(graph[module].dependencies[relativePath])
        }

        /**
         * exports本质即一个挂载，通过IIFE处理require以将当前module内所有依赖的具体变量取出
         * 以把该module所有依赖都直接与前者合并成一个文件，后者才能直接在浏览器内执行，实现模块化的require
         */
        var exports = {};

        //IIFE
        (function(require, exports, code){
          eval(code);
        })(reRequire, exports, graph[module].code);

        //返回目标exports
        return exports;
      }
      require('${this.entry}');
    })(${newAllModules})`;
    //写入新建的可执行打包出口文件
    fs.writeFileSync(filePath, bundle, 'utf-8');
  }
};

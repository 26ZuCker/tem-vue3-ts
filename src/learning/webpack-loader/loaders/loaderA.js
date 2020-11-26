/**
 * 编写loader
 * @param {string|Buffer} source module源代码
 * @param {any} map sourcemap，可选
 * @param {ant} ast 经babel，可选
 * 1.对于同一个module可能使用多个loader则需要保证执行顺序即一定需要返回和source有关的值
 * 2.源代码可能为string或buffer
 */
module.exports = function(source, map = undefined, ast = undefined) {
  /**
   * 获取options并修改源代码，通过this.query获取options
   * 前者挂载参考https://webpack.docschina.org/api/loaders/#the-loader-context
   */
  const res = source.replace('hello', this.query);
  /**
   * 官方推荐通过this.callback而非return返回因为前者能包含更多信息
   */
  this.callback(null, res);
};

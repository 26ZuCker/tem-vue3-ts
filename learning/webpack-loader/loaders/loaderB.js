/**
 * 编写loader
 * @param {string|Buffer} source module源代码
 * @param {any} map sourcemap，可选
 * @param {ant} ast 经babel，可选
 * 1.对于同一个module可能使用多个loader则需要保证执行顺序即一定需要返回和source有关的值
 * 2.源代码可能为string或buffer
 */
module.exports = function(source, map = undefined, ast = undefined) {
  //此处使用箭头函数以获取loader.context
  asyncFm();
};
/**
 * 通过this.async处理异步，前者返回callback函数
 * 需要在异步的回调内代替this.callback()且二者使用语法无异
 */
const asyncFm = () => {
  const asyncCallback = this.async();
  setTimeout(() => {
    //注意执行顺序
    const res = source.replace('zeng', 'liao');
    asyncCallback(null, res);
  }, 1000);
};

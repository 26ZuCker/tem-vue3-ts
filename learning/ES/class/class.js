/**
 * es5实现es6有两种方式：IIFE&闭包，原型和构造函数
 */
class ES6 {
  constructor(params) {}
}
/**
 * IIFE&闭包
 */
var IIFE = (function() {
  var params = [];
  return {};
})();
/**
 * 原型和构造函数
 */
function Proto() {}
Proto = {
  constructor: Proto,
};
Proto.prototype;

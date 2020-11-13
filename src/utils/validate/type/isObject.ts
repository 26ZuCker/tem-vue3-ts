/**
 * 判断变量是否为对象，Map等会返回false
 * @param {any} target
 */
const isObject = function(target: any) {
  return Object.prototype.toString.call(target) === '[object Object]';
};
export default isObject;

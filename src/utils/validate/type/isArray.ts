/**
 * 判断传入的对象是否为Array
 * @param {any} target
 */
const isArray = function(target: any) {
  if (Array.isArray) {
    return Array.isArray(target);
  } else {
    return Object.prototype.toString.call(target) === '[object Array]';
  }
};
export default isArray;

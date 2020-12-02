/**
 * 判断传入的对象是否为Array
 * @param {any} target
 */
const isArray = function(target: any) {
  if (Array.isArray) {
    return Array.isArray(target);
  } else {
    //const reg = /Object Array/;
    const res = Object.prototype.toString.call(target);
    //return reg.test(res);
    return res === '[object Array]';
  }
};
export default isArray;

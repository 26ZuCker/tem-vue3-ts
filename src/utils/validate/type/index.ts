import getType from './getType.js';
import isArray from './isArray.js';
import isObject from './isObject.js';
interface typeMap {
  [key: string]: (target: any) => boolean;
}
/**
 * 类型判断策略
 */
const typeMap: typeMap = {
  ARRAY: isArray,
  OBJECT: isObject,
  /*   NUMBER,
  STRING,
  SYMBOL,
  MAP,
  SET, */
};
/**
 * 校验数据类型
 * @param {any} target
 * @param {string} type
 * 可以通过正则直接匹配如/Object Array/.test(Object.prototype.toString.call(target));
 */
function validateType(target: any, type: string) {
  if (type === 'ARRAY' || type === 'OBJECT') {
    return typeMap[type](target);
  }
  return getType(target) === type;
}
export default validateType;

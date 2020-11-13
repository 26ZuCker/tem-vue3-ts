//正则
export { phoneReg, nameReg, positiveInteger } from './reg';
//类型
import getType from './type';
export { getType };
export { isArray, isObject } from './type';
/**
 * 柯里化入口函数，根据传入的校验类型返回相应的校验函数，后期必须检查能否tree-shaking
 * @param {string} validType 可选：TYPE，REG
 */
const validate = (validType = 'TYPE') => {
  if (validType === 'TYPE') {
    return validateType;
  } else if (validType === 'REG') {
    return validateReg;
  }
};
/**
 * 校验正则
 * @param {any} target
 * @param {string} type
 */
function validateReg(target: any, type: string) {}
/**
 * 校验数据类型
 * @param {any} target
 * @param {string} type
 */
function validateType(target: any, type: string) {}

export default validate;

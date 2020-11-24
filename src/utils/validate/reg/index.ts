//正则入口文件
//数字
import { phone, positiveInteger } from './number.js';
//名字
import { name } from './name.js';
const url = /^(((ht|f)tps?):\/\/)?[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/;
interface regMap {
  [key: string]: RegExp;
}
/**
 * 正则映射
 */
const regMap: regMap = {
  positiveInteger: positiveInteger,
  phone: phone,
  name: name,
  url: url,
};
/**
 * 校验正则
 * @param {any} target
 * @param {string} type
 */
function validateReg(target: any, type: string) {
  return regMap[type].test(target);
}
export default validateReg;

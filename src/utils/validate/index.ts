//正则
import validateReg from './reg';
//类型
import validateType from './type';
/**
 * 根据传入的校验类型返回相应的校验函数，后期必须检查能否tree-shaking
 * @param {string} validType 可选：TYPE，REG
 */
const validate = (target: any, validType: string = 'TYPE', selfType: string) => {
  if (validType === 'TYPE') {
    return validateType(target, selfType);
  } else if (validType === 'REG') {
    return validateReg(target, selfType);
  }
};

export default validate;

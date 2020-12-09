import { rest } from 'lodash';

/**
 * 工厂模式
 * @param _constructor 构造函数
 * @param _rest 传入构造函数的参数
 */
const factory = (_constructor: (...rest: any[]) => void, ..._rest: any[]) => {
  return new _constructor(rest);
};
export default factory;

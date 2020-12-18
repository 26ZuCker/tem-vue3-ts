import { rest } from 'lodash';

/**
 * 工厂模式
 * @param _constructor 构造函数
 * @param _Rest 传入构造函数的参数
 */
const factory = (_constructor: (...rest: any[]) => void, ..._Rest: any[]) => {
  return new _constructor(rest);
};
export default factory;

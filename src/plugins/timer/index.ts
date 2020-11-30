//参考https://mp.weixin.qq.com/s/4QpR9ElbFZwuNH2pcoI_mA
export * from './Timer';
export * from './Behavior';
export * from './Store';
/**
 * new实例，接收泛型T和U
 * 由于ts基于es6超集所以可使用...展开
 * @example const man = newObj<c_Person, i_Person>(Person, 'zeng');
 * @param constructor 构造函数，类型T
 * @param args rest参数，类型any
 * @returns 类型U
 */
export default function newObj<T, U>(constructor: any | T, ...args: any[]): U {
  //return 'Promise' in window ? new constructor(...args) : new constructor().apply(null, args);
  return new constructor(...args);
}

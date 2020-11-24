export * from './Timer';
export * from './Behavior';
export * from './Store';
/**
 * new实例，接收泛型T和U
 * @example const man = newObj<c_Person, i_Person>(Person, 'zeng');
 * @param constructor 构造函数，类型T
 * @param args rest参数，类型any
 * @returns 类型U
 */
export default function newObj<T, U>(constructor: any | T, ...args: any[]): U {
  //return 'Promise' in window ? new constructor(...args) : new constructor().apply(null, args);
  return new constructor(...args);
}

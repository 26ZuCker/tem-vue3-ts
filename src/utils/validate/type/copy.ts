//packages\shared\src\index.ts
//以下摘自vue3源码
/**
 * 返回属性是否只存在该对象上而无关其原型链上
 */
const hasOwnProperty = Object.prototype.hasOwnProperty;
const hasOwn = (val: object, key: string | symbol): key is keyof typeof val =>
  hasOwnProperty.call(val, key);
/**
 * 返回Object.prototype.toString的引用
 */
const objectToString = Object.prototype.toString;
/**
 *
 * @param value
 */
const toTypeString = (value: unknown): string => objectToString.call(value);
/**
 * 判断是否是array，使用es6的Array.isArray()
 */
const isArray = Array.isArray;
const isObject = (val: unknown): val is Record<any, any> => val !== null && typeof val === 'object';

const isPlainObject = (val: unknown): val is object => toTypeString(val) === '[object Object]';

const isMap = (val: unknown): val is Map<any, any> => toTypeString(val) === '[object Map]';
const isSet = (val: unknown): val is Set<any> => toTypeString(val) === '[object Set]';

const isDate = (val: unknown): val is Date => val instanceof Date;
const isFunction = (val: unknown): val is Function => typeof val === 'function';

const isPromise = <T = any>(val: unknown): val is Promise<T> => {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch);
};

/**
 * 返回是否是原始类型
 * @param value
 */
const toRawType = (value: unknown): string => {
  return toTypeString(value).slice(8, -1);
};
const isSymbol = (val: unknown): val is symbol => typeof val === 'symbol';

const isString = (val: unknown): val is string => typeof val === 'string';
/**
 * 返回是否是
 * @param key
 */
const isIntegerKey = (key: unknown) =>
  isString(key) && key !== 'NaN' && key[0] !== '-' && '' + parseInt(key, 10) === key;

const toNumber = (val: any): any => {
  const n = parseFloat(val);
  return isNaN(n) ? val : n;
};

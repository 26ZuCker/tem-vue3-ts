//拷贝目标
const obj = { a: 1, b: [2, { c: 3 }], d: { e: [4], f: 5 } };
/**
 * 常规手写深拷贝即递归浅拷贝
 */
const deep_clone = (obj) => {};
const copy1 = { ...obj }; //浅拷贝结果
/**
 * 用于存放所有的proxy对象，注意必须用Map作为容器因为此处保存的key为原对象，value为其proxy对象
 * 而object的key只能为string即存放在栈内存中的非引用变量，此处的key为地址即堆内存中的引用变量
 */
const proxies = new Map();
/**
 * 由于
 * 通过proxy优化深拷贝，返回值即深拷贝的结果copy2
 * 1.生成obj的proxy对象，通过getProxy生成，同时通过isProxy判断是否已经经过proxy而成为proxy对象
 * 2.
 */
const proxy_deep_clone = (obj) => {};

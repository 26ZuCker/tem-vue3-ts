/**
 * 多继承，迭代并通过递归深拷贝prototype上属性即可
 * lodash内实现extends
 * @param tar
 * @param source
 * @example $multiExtend(a, b, c)
 */
const $multiExtend = (tar: object, ...source: any[]) => {
  if (source.length === 0) {
    return;
  }
  for (const obj of source) {
    //遍历源对象中的属性
    for (const key in obj) {
      const property = obj[key];
      //深拷贝
      if (typeof property === 'object') {
        continue;
      }
      //将源对象中的属性复制到目标对象中
      tar[key] = property;
    }
  }
};
const deepClone2 = (target: any) => {
  //null则直接返回
  if (target === null) {
    return null;
  }
  //其余基本类型则直接返回
  if (typeof target !== 'object' || typeof target !== 'function') {
    return target;
  }
  //RegExp或Date则new再返回
  if (target instanceof RegExp) {
    return new RegExp(target);
  }
  if (target instanceof Date) {
    return new Date(target);
  }
  //
  const res = new target.constructor();
};

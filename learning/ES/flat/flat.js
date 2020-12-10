const arr = [1, [2, 3], 4];
/**
 * for + 迭代实现flat
 * @param {*} arr
 */
const flat1 = (arr) => {
  const res = [];
  for (const [, v] of arr.entires()) {
  }
};
/**
 * reduce + 递归实现flat
 * @param {*} arr
 */
const flat2 = (arr) =>
  arr.reduce((prev, cur) => prev.concat(Array.isArray(cur) ? flat2(cur) : cur), []);
/**
 * stack实现扁平算法
 * @param {*} arr
 */
const flat3 = (arr) => {
  const res = [];
  const st = [];
};
/**
 *
 * @param {*} arr
 */
function flat4(arr) {}

import sort from './sort';
/**
 * 手写二分搜索
 * @param arr 已排序数组，默认升序
 * @param tar 需要找的目标值
 */
const binarySearch = (arr: number[], tar: number) => {
  let res: number[] = [];
  //由于务必要判断传入的数组是否已升序所以必定遍历一遍
  res = sort(arr);
  /**
   * 默认升序
   * @param arr
   */
  const helper = () => {
    let left = 0;
    let right = arr.length - 1;
    let cur = arr[left];
    cur;
  };
  return helper();
};
export default binarySearch;

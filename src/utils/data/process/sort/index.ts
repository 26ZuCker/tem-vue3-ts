import insertSort from './insertSort';
import quickSort from './quickSort';
/**
 * 手写Chrome7之前版本的V8排序即以10为分界线，前则插入排序，后则快排
 * 参考https://yalishizhude.com/2019/09/05/v8-sort/
 * 参考https://juejin.cn/post/6844903504654368781
 * 参考https://juejin.cn/post/6844903953964990471
 * 深拷贝
 * 假如多个判断是否传入数组或数据的类型是否满足条件
 * 扁平化
 * @param rest 传入单个任意序数组或多个数字
 */
const sort = (arr: number[], ascending = true) => {
  const res: number[] = [];
  return res;
};

export default sort;

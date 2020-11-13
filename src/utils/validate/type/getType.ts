/**
 * 获取目标变量的类型
 * @param {any} target
 */
export default function(target: any) {
  const typeStr = Object.prototype.toString.call(target);
  return typeStr.slice(8, -1);
}

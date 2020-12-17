/* 
const实现变量不可修改本质是在编译层面而非代码层面
经过babel编译如下
function _readOnlyError(name) {
  throw new TypeError('"' + name + '" is read-only');
}
var co = 1;
co = (_readOnlyError('co'), 2);
*/
const co = 1;

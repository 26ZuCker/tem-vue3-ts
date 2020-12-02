//在node执行esm：
//1.所有文件名后缀改为mjs
//2.node --experimental-modules main.mjs

//返回promise异步导入，回调内res等同import * as res即Module整体
//所以以下执行顺序：b -> c -> a
const a = import('./module.mjs');
//同步导入，b即Module.default
import b, { module } from './module.mjs';
//同步导入，c即Module整体，内部包含default
import * as c from './module.mjs';

console.log('#'.repeat(20));
a.then((res) => {
  //[Module] { default: [Function: default], module: 1 }
  console.log(res);
  //console.log(Object.prototype.toString.call(res));
});

console.log('#'.repeat(20));
//[Function: default]
console.log(b);

console.log('#'.repeat(20));
//[Module] { default: [Function: default], module: 1 }
console.log(c);

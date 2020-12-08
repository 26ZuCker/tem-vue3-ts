//多宿主均有，指向其唯一全局对象，在浏览器和node内分别指向window和global
console.log(globalThis);

//node独有
/**
 * 类型为Arguments，因为本质上node为每一个module作为IIFE
 * 可遍历属性按序为exports, require, module, __filename, __dirname
 */
console.log(arguments);

console.log(global);

console.log(module);
//指向module.exports
console.log(exports);

//浏览器独有
console.log(window);

//指向window
console.log(self);

console.log(navigator);

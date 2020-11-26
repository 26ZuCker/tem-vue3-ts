编写 loader

1. 本质即一个声明式函数，注意：不能使用箭头函数，因为需要通过 this 获取调用者的原生 webpack 的 api

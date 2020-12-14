const { functionsIn } = require('lodash');

/**
 * JavaScript中任何异步的错误都无法被捕获，包括try-catch
 * 能被try-catch捕捉到的异常，必须是在报错的时候线程执行已经进入try-catch代码块
 * 且处在try-catch里面才能被捕捉到
 */
async function try_catch() {
  //函数声明无关执行即只看try-catch内的执行
  function a() {}
  try {
    a();
    function b() {}
  } catch (error) {}
  b();

  //任何try-catch内部的异步代码都无法被捕获
  try {
    setTimeout(() => {
      console.log(1);
    }, 0);
  } catch (error) {}

  //即使new Promise()也无法被父try-catch捕获
  //Promise 的异常都是由 reject 和 Promise.prototype.catch 来捕获，不管是同步还是异步
  //核心原因是因为Promise在执行回调中都用try-catch包裹起来了，其中所有的异常都被内部捕获到了，并未往上抛异常
  //catch()本质即then(null, error)的语法糖
  //参考https://juejin.cn/post/6844903987183894535
  try {
    new Promise((resolve, reject) => {
      throw new Error('2');
    }).catch((err) => {});
  } catch (error) {}

  //await可以被try-catch捕获，async本质基于promise和generator
  //参考https://juejin.cn/post/6844904143891464200
  try {
    await Promise.reject(3);
  } catch (error) {
    Promise.resolve(error);
  }
}

try_catch().catch((res) => {});

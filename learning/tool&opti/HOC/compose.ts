/**
 * 组合函数，相当于把fn3先执行然后把结果传给fn2再执行，最后把结果交给fn1去执行
 * compose(fn1, fn2, fn3) (...args) -> fn1(fn2(fn3(...args)))
 * redux等中间件实现
 * @param fns
 */
const compose = (...fns: Function[]) =>
  fns.reduce((prev, cur) => (...rest: any[]) => prev(cur(...rest)));

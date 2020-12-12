/**
 * koa上下文
 */
interface Context {
  req: string;
  res: any;
}
/**
 * 中间件本体
 */
type Middleware = (ctx: Context, next: Function) => void;

function composeMid(middlewares: Middleware[]) {
  return function wrapMid(ctx: Context) {
    /**记录当前进入到的middleware的索引 */
    let index = -1;
    /**
     * 执行中间件
     * @param i
     */
    function dispatch(i: number) {
      index = i;
      const fn = middlewares[i];
    }
  };
}
class Koa {
  private middlewares: Middleware[];
  /**
   * 使用中间件即存入
   * @param middleware
   */
  use(middleware: Middleware) {
    this.middlewares.push(middleware);
  }

  start() {
    const composition = composeMid(this.middlewares);
    const ctx = {};
    return composition;
  }
}

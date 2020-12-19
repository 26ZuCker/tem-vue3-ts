const Koa = require('koa');
const myApp = new Koa();

myApp.use(async (ctx, next) => {
  await next();
  ctx.set('X-XSS-Protection', 0);
  ctx.set('X-FRAME-OPTIONS', 'DENY');
});

module.exports = myApp;

const Koa = require('koa');
const chalk = require('chalk');

/**
 * 模拟攻击者服务器
 */
const hackApp = new Koa();
/**
 * 红色输出以代表攻击者
 * @param {string} content
 */
const log = (content) => {
  console.log(chalk.red(content));
};

const static = require('koa-static');
hackApp.use(static(__dirname + '/views'));
hackApp.use(async (ctx, next) => {
  log('hack in' + ctx.url);
  await next();
});

module.exports = hackApp;

import common from './src/configs/common';
const isProd = process.env;
/**
 * vue3+ts配置，注意由于ts 最终还是需要编译为js才能在浏览器内执行，而编译过程在webpack内进行
 * 而webpack本身就是使用js的打包工具即其配置文件也是基于js，所以vue.config需要为js而非ts
 */
const vue_config = { ...common };

if (isProd) {
  const prod_config = import('./src/configs/prod');
  Object.assign(vue_config, prod_config);
} else {
  const dev_config = import('./src/configs/dev');
  Object.assign(vue_config, dev_config);
}

export default vue_config;

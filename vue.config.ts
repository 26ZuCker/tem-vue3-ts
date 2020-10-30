import common from './src/configs/common';
const dev_config = import('./src/configs/dev');
const prod_config = import('./src/configs/prod');

const isProd = process.env;
/**
 * vue3+ts配置
 */
const vue_config = { ...common };

if (isProd) {
  Object.assign(vue_config, prod_config);
} else {
  Object.assign(vue_config, dev_config);
}

export default vue_config;

import common from './src/configs/common';
const isProd = process.env;
/**
 * vue3+ts配置
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

import { render, h } from 'vue';

/**
 * 生成组件
 * @param hook
 * @param rest
 */
const component = (hook: any, ...rest: any[]) => {
  const {} = hook(...rest);
};

export default component;

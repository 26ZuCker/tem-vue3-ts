import { VNode, DirectiveBinding } from 'vue';

const options = {
  beforeMount(
    el: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
    binding: DirectiveBinding,
    vnode: VNode,
    prevVNode: VNode
  ) {
    //v-dir.modifiers:arg = value
    //一般modifiers和arg选其一即可
    const { dir, instance, arg, modifiers, oldValue, value } = binding;
  },
  //父组件挂载后
  mounted() {},
  //父组件更新前
  beforeUpdate() {},
  //父组件及其子组件更新后
  updated() {},
  beforeUnmount() {},
  unmounted() {},
};

/**
 * 只在mounted和updated触发且行为相同则传递函数
 */
const fn = (
  el: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
  binding: DirectiveBinding,
  vnode: VNode,
  prevVNode: VNode
) => {};

export default options;

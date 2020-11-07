import { ref, reactive, onMounted, onBeforeUnmount, SetupContext } from 'vue';

interface SonProps {}

const a = ref(0);

const b = reactive({
  name: '',
});

const SonOnMounted = () => onMounted(() => {});

const SonHook = () => {
  return {
    a,
    b,
    SonOnMounted,
  };
};
/**
 * 通过接受一个参数，可以动态改变hook
 */
export default SonHook;
/**
 * 默认导出一个返回值为与当前组件有关的所有hook的对象，具名导出与当前组件有关的interface
 */
export { SonProps };

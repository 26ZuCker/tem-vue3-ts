import { ref, reactive, onMounted, onBeforeUnmount, SetupContext } from 'vue';

interface SonProps {}

const a = ref(0);
/**
 * 推荐使用interface装饰reactive
 */
interface b {
  name: string;
}

const b = reactive<b>({
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
 * 统一具名导出一个返回值为与当前组件有关的所有hook的对象和与当前组件有关的interface
 */
export { SonHook, SonProps };

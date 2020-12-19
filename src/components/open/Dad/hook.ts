import { ref, reactive, onMounted, onBeforeUnmount, SetupContext } from 'vue';

/**
 * 组件本身需要接受的参数
 */
interface DadProps {}

const a = ref(0);

const b = reactive({
  name: '',
});

const DadOnMounted = () => onMounted(() => {});

const DadHook = (...rest: _Rest) => {
  return {
    a,
    b,
    DadOnMounted,
  };
};
/**
 * 统一具名导出一个返回值为与当前组件有关的所有hook的对象和与当前组件有关的interface
 */
export { DadHook, DadProps };

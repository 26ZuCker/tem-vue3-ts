import { ref, reactive, onMounted, onBeforeUnmount, SetupContext } from 'vue';

interface DadProps {}

const a = ref(0);

const b = reactive({
  name: '',
});

const DadOnMounted = () => onMounted(() => {});

const DadHook = () => {
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

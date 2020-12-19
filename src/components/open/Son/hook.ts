import {
  ref,
  reactive,
  toRefs,
  isRef,
  readonly,
  computed,
  watch,
  watchEffect,
  onMounted,
  onBeforeUnmount,
  onUnmounted,
  unref,
} from 'vue';

function useAdd() {
  const state = reactive({
    todos: [
      { name: 'BBQ', done: false },
      { name: 'AAQ', done: false },
    ],
    val: 'ok',
  });
  const total = computed(() => state.val + 'zeng');
  const addTwo = () => {
    state.todos.push({ name: 'CCQ', done: true });
  };
  return {
    state,
    total,
    addTwo,
  };
}

export default useAdd;

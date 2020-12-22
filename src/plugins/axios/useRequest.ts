import { reactive, onMounted, toRefs } from 'vue';

function helper(axios) {
  return function useRequest(url: string, params, config) {
    // 统一维护的变量，最后return出去
    const state = reactive({
      loading: false,
      error: false,
      data: config.initialData,
    });

    const fetchFunc = () => {
      state.loading = true;
      // 做请求的公用逻辑
      axios()
        .then((response) => {
          const result = response.data;
          state.data = result.data;
          state.loading = false;
        })
        .catch((err) => {
          state.error = true;
        });
    };

    onMounted(() => {
      if (config.immediate) {
        fetchFunc();
      }
    });

    // toRefs 可以将state，拆解成多个ref，这样调用者就可以使用解构来拿到变量
    return { ...toRefs(state), fetch: fetchFunc };
  };
}

export default helper;

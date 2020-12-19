<template>
  <input type="text" v-model="state.val" />
  <ul>
    <li @keyup.enter="addTwo" v-for="todo in state.todos" :key="todo.name">
      {{ todo.name }}
    </li>
  </ul>
</template>
<script lang='ts'>
import useAdd from "./hook";

interface xxxProps {}

export default {
  inheritAttrs: false,
  name: "",
  components: {},
  setup(props: xxxProps, context) {
    const { attrs, emit, slots } = context;

    const { state, total, addTwo } = useAdd();

    return {
      state,
      total,
      addTwo,
    };
  },
};
</script>
<style lang='scss' scoped></style>
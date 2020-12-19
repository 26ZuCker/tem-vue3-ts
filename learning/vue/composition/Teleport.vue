<template>
  <div></div>
  <teleport to=".classA">
    <h1>
      该元素将会指定挂载在父组件中class为classA的标签上
      而其余元素将会挂载在子组件放置位置
      即teleport使用子组件的作用域但放置却独立于子组件
    </h1>
  </teleport>
  <teleport to=".classA">
    <h2>
      在同一组件内挂载同一目标的teleport将会按序插入即次标签将会放在上面的之后
    </h2>
  </teleport>
  <!-- https://vue3js.cn/docs/zh/api/built-in-components.html#teleport -->
  <teleport to="body"> </teleport>
</template>
<script lang='ts'>
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
  SetupContext,
} from "vue";
interface xxxProps {}
export default {
  inheritAttrs: false,
  name: "",
  components: {},
  setup(props: xxxProps, context: SetupContext) {
    const { attrs, emit, slots } = context;
    return {};
  },
  props: {},
  data() {
    return {};
  },
  methods: {},
  computed: {},
  watch: {},
};
</script>
<style lang='scss' scoped></style>
<template>
  <div></div>
  <div></div>
</template>
<script lang='ts'>
import { VirListHook, VirListProps, SetupContext } from "./hook";
export default {
  inheritAttrs: false,
  name: "VirtualList",
  components: {},
  setup(props: VirListProps, context: SetupContext) {
    const { attrs, emit, slots } = context;
    const {} = VirListHook(props);
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
<style lang='scss' scoped>
</style>
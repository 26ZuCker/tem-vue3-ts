<template> </template>
<script lang="ts">
import { SetupContext } from "vue";
import open from "@/components/open";
interface openProps {}
export default {
  inheritAttrs: false,
  name: "open",
  components: {},
  setup(props: openProps, { attrs, emit, slots }: SetupContext) {}
};
</script>
<style lang="scss" scoped>
@import url("./open.scss");
</style>
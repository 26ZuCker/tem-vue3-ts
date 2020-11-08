<template> </template>
<script lang="ts">
import SonHook, { SonProps } from "./hook";
export default {
  setup(props: SonProps, context) {
    const { a, SonOnMounted } = SonHook();
    SonOnMounted();
    return {
      a,
      SonOnMounted
    };
  }
};
</script>
<style lang="scss" scoped>
@import url("./Son.scss");
</style>
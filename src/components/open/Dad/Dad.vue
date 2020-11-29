<template>
  <div>Dad</div>
  <Son></Son>
</template>
<script lang="ts">
import Son from "../Son/Son.vue";
import { DadHook, DadProps } from "./hook";
export default {
  components: { Son },
  setup() {
    const { a, b, DadOnMounted } = DadHook();
    return {
      a,
      b,
      DadOnMounted,
    };
  },
};
</script>
<style lang="scss" scoped>
@import url("./Dad.scss");
</style>
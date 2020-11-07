<template>
  <Son></Son>
  <Dad></Dad>
</template>
<script lang="ts">
import { SetupContext } from "vue";
import Son from "@/components/open/Son/Son.vue";
import Dad from "@/components/open/Dad/Dad.vue";

export default {
  inheritAttrs: false,
  name: "open",
  components: { Son, Dad },
  setup() {}
};
</script>
<style lang="scss" scoped>
@import url("./open.scss");
</style>
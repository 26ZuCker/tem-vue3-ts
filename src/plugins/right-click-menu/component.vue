<template>
  <div></div>
  <div></div>
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

import hook from "./hook";

export default {
  inheritAttrs: false,
  name: "",
  components: {},
  setup(_, context: SetupContext) {
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
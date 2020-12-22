<template>
  <!-- 使用v-model相当于 -->
  <ChildComponent v-model:title="pageTitle" v-model:content="pageContent" />
  <!-- would be shorthand for: -->
  <ChildComponent
    :title="pageTitle"
    @update:title="pageTitle = $event"
    :content="pageContent"
    @update:content="pageContent = $event"
  />

  <input type="text" v-model="title" />
  <input type="text" :modelValue="title" @update:modelValue="title = $event" />
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
} from 'vue';
interface xxxProps {}
export default {
  inheritAttrs: false,
  name: '',
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
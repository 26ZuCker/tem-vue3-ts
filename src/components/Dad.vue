<template>
  <div id="app">
    <h1>父组件</h1>
    <button @click="showComRef">展示子组件的值</button>
    <son ref="comRef"></son>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import Son from "./Son.vue";

export default {
  name: "app",
  components: {
    son: Son
  },
  setup(props, context) {
    const comRef = ref(null);
    const showComRef = () => {
      console.log(comRef);
      console.log("str1的值是" + comRef.value.str1);
      comRef.value.setStr1();
    };
    return {
      comRef,
      showComRef
    };
  }
};
</script>
<template>
  <!-- 
模板引用即绑定ref
1.使用区别：
options：绑定的标识title为字符串，通过this.$refs.title调用
composition：title需要为ref即const title = ref(null)且在setup中返回即可
2.假如绑定的元素上使用v-for则返回有序数组
-->
  <p ref="title">hh</p>
  <div></div>
</template>
<script lang="ts">
import { ref } from "vue";
export default {
  setup() {
    /**
     * 获取元素对象，相当于vue2中的ref
     */
    const title = ref(null);
    console.log(title.value);
  },
};
</script>
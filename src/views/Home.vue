<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
  </div>
  <div></div>
</template>

<script lang="ts">
interface Data {
  [key: string]: unknown;
}
import { defineComponent, SetupContext } from "vue";
import HelloWorld from "@/components/HelloWorld.vue"; // @ is an alias to /src

export default defineComponent({
  name: "Home",
  components: {
    HelloWorld,
  },

  setup(props: Data, context: SetupContext) {},
});
</script>

编写 loader

1. 本质即一个声明式函数，注意：不能使用箭头函数，因为需要通过 this 获取调用者的原生 webpack 的 api

##### vue-loader

之所以能够编写.vue 即单文件组件 SFC 且将其注入 vue 实例内的原因，即解析以下文件及其代码：

- 在<style>使用 scss-loader，并模拟 scoped scss
- 在<template>使用 PUG

```vue
<template>
  <div></div>
</template>
<script lang="ts"></script>
<style lang="scss" scoped></style>
```

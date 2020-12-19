//独立的npm模块
const { effect, ref } = require('@vue/reactivity');

const count = ref(1);

effect(() => {
  console.log(count.value);
});

setInterval(() => {
  ++count.value;
}, 1000);

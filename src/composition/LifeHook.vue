<script lang="ts">
import {
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted,
  onErrorCaptured
} from "vue";

export default {
  setup() {
    /**
     * 注入生命周期钩子
     * @param {*} cb 注入当前组件生命周期中的回调
     * @param {*} ComponentInternalInstance
     * 1.第一个参数为回调，在setup外部的mounted之前执行
     * 2.接收参数与setup相同即props和context
     * 3.可同时使用多个相同的生命周期钩子，调用顺序等同于注入的顺序
     */
    onMounted(() => {}, {});
  }
};
</script>
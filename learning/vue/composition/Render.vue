<script lang="ts">
import { render, h, onRenderTracked, onRenderTriggered } from "vue";
export default {
  /**
   * 1.相对于2，此处的h通过全局导入而非作为参数导入
   * 2.放在setup内：使用h
   * 3.放在setup外：jsx语法
   * 4.需要返回h
   */
  render() {
    /**
     *
     */
    return h("div");
  },

  setup() {}
};
</script>
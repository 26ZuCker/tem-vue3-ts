<template>
  <div class="lp-confirm-container" ref="lpConfirmAlert">
    <div class="lp-confirm-box">
      <div class="lp-confirm-title">
        <span class="lp-confirm-title-txt">{{ title }}</span>
        <span class="lp-confirm-title-close" @click="closeConfirm"
          >&#10006;</span
        >
      </div>
      <div class="lp-confirm-content">
        <span class="lp-confirm-content-txt">{{ content }}</span>
      </div>
      <div class="lp-confirm-btn-groups">
        <lp-button type="primary" class="lp-confirm-btn" @_click="sureConfirm"
          >确定</lp-button
        >
        <lp-button
          type="default"
          class="lp-confirm-btn lp-confirm-btn-cancel"
          @_click="closeConfirm"
          >取消</lp-button
        >
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import lpButton from "../lp-button/lp-button";
import { ref } from "vue";
export default {
  components: {
    lpButton,
  },
  props: {
    title: {
      type: String,
      default: "提示",
    },
    content: {
      type: String,
      default: "确定关闭吗？",
    },
  },
  setup() {
    const status = ref(-1); // 存储用户点的状态，-1：未点击；0：取消；1：确定
    const lpConfirmAlert = ref(null);

    function removeElement() {
      lpConfirmAlert.value.parentNode.removeChild(lpConfirmAlert.value);
    }

    function closeConfirm() {
      status.value = 0;
      removeElement();
    }

    function sureConfirm() {
      status.value = 1;
      removeElement();
    }

    return { removeElement, closeConfirm, sureConfirm, status, lpConfirmAlert };
  },
};
</script>

<style scoped>
/* 样式见源码，此处省略 */
</style>

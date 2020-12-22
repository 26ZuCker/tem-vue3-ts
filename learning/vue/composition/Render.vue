<script lang="tsx">
import {
  render,
  h,
  ref,
  onRenderTracked,
  onRenderTriggered,
  defineComponent,
} from 'vue';
export default defineComponent({
  inheritAttrs: false,
  name: '',
  components: {},
  setup(props, context) {
    const { attrs, emit, slots } = context;
    const level = ref(1);
    return {
      slots,
      level,
    };
  },
  props: {},
  data() {
    return {};
  },
  methods: {},
  computed: {},
  watch: {},
  /**
   * 1.相对于2，此处的h通过全局导入而非作为参数导入
   * 2.放在setup内：使用h
   * 3.放在setup外：jsx语法
   * 4.需要返回h或jsx
   */
  render() {
    const tag = `h${this.level}`;
    return (
      <>
        <tag>{this.slots.default}</tag>
        <div></div>
      </>
    );
  },
});
</script>
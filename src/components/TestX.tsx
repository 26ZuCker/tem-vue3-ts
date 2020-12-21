import {
  defineComponent,
  SetupContext,
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
} from 'vue';
import './xxx.scss';
interface xxxProps {}
export default defineComponent({
  name: 'TestX',
  emits: {},
  inheritAttrs: false,
  components: {},
  setup(props: xxxProps, ctx: SetupContext) {
    return {};
  },
  render() {
    return <div></div>;
  },
});

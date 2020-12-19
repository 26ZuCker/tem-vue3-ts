import {
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
  SetupContext,
} from 'vue';

interface VirListProps {
  reqUrl?: string;
  totalList?: object;
}
/**
 * 入口函数
 */
const VirListHook = (props: VirListProps) => {
  return {};
};
/**
 * 类型
 */
export { VirListHook, VirListProps, SetupContext };

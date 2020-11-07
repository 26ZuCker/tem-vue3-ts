<script lang="ts">
import { SetupContext } from "vue";
/**
 * 建议为当前子组件接收参数配置类型interface
 */
interface props {
  [key: string]: unknown;
}
export default {
  /**
   * 1.default：基本类型直接提供即可，引用类型需要设置为function
   * 2.validator：本质即一个function，返回Boolean为true即可
   * 3.建议一律采用object传值
   * 4.对于data内的变量而言，无论ref还是reactive都通过proxy进行包裹即一律采用const声明即可
   * 5.避免使用箭头函数和解构，前者会丢失this，后者需要toRefs才能恢复响应式
   * 6.响应式，但应该为单向即子组件内不允许主动更改props中的属性
   */
  props: {},
  /**
   * 1.不存在this即无法访问组件中除props外任何属性
   * 2.通过导入onMounted等生命周期钩子实现注入当前组件的生命周期，注意前者的回调于后者内部之前执行
   * 3.setup可代替created并与beforeCreated和created之前执行
   * 4.由于几乎所有的组件的属性都通过钩子声明在setup内，所以他们的声明必须按顺序以便管理：ref -> reactive -> watch -> computed -> lifeHook -> methods
   * 5.对于监听子组件，vue会默认挂载到其根元素
   * 作用：
   * 1.异步获取数据，因为其本身即为异步
   * 2.provide和inject只能存在于setup中
   * @param {*} props 等同于当前组件的props
   * @param {*} context 非响应式即允许解构，但attrs和slots不能再解构
   */
  setup(props: props, { attrs, slots, emit }: SetupContext) {},
  //以下为当前组件原生属性
  methods: {},
  computed: {},
  watch: {},
  data: () => ({}),
  mounted() {}
};
</script>
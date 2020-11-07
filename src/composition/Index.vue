<script lang="ts">
/**
 * 1.所有使用的钩子都必须从vue内导出
 * 2.允许template内使用多个根节点
 * 3.以下讨论的副作用相当于回调，如watch和watchEffect
 */
import {
  //生命周期钩子
  onMounted,
  onUpdated,
  onRenderTracked,
  onRenderTriggered,
  onUnmounted,
  onActivated,
  onDeactivated,
  //错误处理
  onErrorCaptured,
  warn,
  //响应式
  reactive,
  readonly,
  ref,
  toRefs,
  toRef,
  watch,
  watchEffect,
  computed,
  provide,
  inject,
  //组件
  defineComponent,
  defineAsyncComponent,
  //渲染
  nextTick,
  h,
  render,
  //类型
  SetupContext
} from "vue";

export default {
  inheritAttrs: false,
  name: "",
  components: {},
  setup(props, { attrs, slots, emit }: SetupContext) {
    /**
     * @description toRefs(object) 将对于响应式对象的引用转换为对普通对象的引用
     * 1.默认props对象本身是响应式，但注意假如需要解构其中的属性则需要通过toRefs进行包裹
     * 2.注意对于引用类型的props的属性，在子组件内修改仍会影响到父组件，建议传递基本类型即可
     * 3.假如直接访问解构的变量由于proxy的拦截得到的是深拷贝的值，只有通过toRefs转换为对于原始对象的引用才能不丢失响应式
     * 4.解构props则其中的数据不会响应式，需要也建议通过toRefs来解构
     */
    const {} = toRefs(props);
    /**
     * @description ref() ref常用于包装非Object外的基本类型和[]为响应式，注意只是习惯上而言
     * 1.js内通过tar.value取值，但html内使用{{tar}}即可
     * 2.ref底层基于reactive实现：const count = ref(0)等同于const count = reactive({ value: 0 })
     * 3.ref展开：不需要tar.value而直接通过tar访问，在setup返回值中的ref均为ref展开即得以在html和data内直接使用
     * 4.dom引用：包装null
     * 由于组件在mounted后才生成，所以该专指dom的ref只能用于onMounted内，且必须在setup内return
     * 通过ref.value.style.color = 'red'修改html原生属性，ref.value.$data获取子组件setup中return等属性
     */
    const count = ref(0);
    const p1 = ref(null);
    /**
     * 传入任何对象即包括ref或reactive相当于Object.freeze
     * 注意：深层只读即对象的属性都不可修改
     */
    const copy = readonly(count);
    /**
     * reactive参数只能接收Object
     * 1.解构只能取值但也断开了引用，无论该属性是基本还是引用类型
     * 2.假如需要解构且解构后的变量仍为响应式，须再包裹toRefs，参考上方toRefs(props)
     * 3.本质上ref和reactive只是写法上的差异，底层只有reactive，data()返回的object同理
     * 4.
     */
    const userInfo = reactive({
      name: "zeng",
      age: "20",
      permission: []
    });
    /**
     * 接收一个函数或一个对象作为参数，使用前者表示该computed只读，后者表示可读可写
     * @param {function} get 返回不可变即readonly的ref
     * @param {function} set 为该computed赋值会触发
     * 1.由于所有的钩子都属于setup的作用域所以直接使用此处定义的变量而无需使用this
     * 2.可以获取computed返回的ref但不应该修改它而应该修改该ref依赖的变量
     * 3.setter通过fullName.value = val实现修改任何的值但建议修改跟getter有关的依赖其一即可
     */
    const fullName = computed({
      get: () => `${userInfo.name} hui`,
      set: (val: any) => {
        userInfo.name = val;
      }
    });
    /**
     * 不可改变
     */
    const firstName = computed(() => userInfo.name);
    const getUserInfo = async () => {};
    /**
     * 返回值将会注入并覆盖组件属性如data，methods，computed，watch等，ref会展开
     * function则默认注入组件内的methods，其余注入data
     */
    return {
      count,
      userInfo,
      getUserInfo,
      p1
    };
  }
};
</script>

<style scoped>
</style>

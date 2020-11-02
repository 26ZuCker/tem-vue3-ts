<template>
  <!-- 
模板引用即绑定ref
1.使用区别：
options：绑定的标识title为字符串，通过this.$refs.title调用
composition：title需要为ref即const title = ref(null)且在setup中返回即可
2.假如绑定的元素上使用v-for则返回有序数组
-->
  <p ref="title">hh</p>
  <div></div>
</template>

<script lang="ts">
/**
 * 1.所有使用的钩子都必须从vue内导出
 * 2.允许template内使用多个根节点
 * 3.以下讨论的副作用相当于回调，如watch和watchEffect
 */
import {
  onMounted,
  onUpdated,
  onErrorCaptured,
  onRenderTracked,
  onRenderTriggered,
  onUnmounted,
  onActivated,
  onDeactivated,
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
  render,
  defineComponent,
  defineAsyncComponent,
  //
  SetupContext
} from "vue";

interface Data {
  [key: string]: unknown;
}

export default {
  /**
   * 对于监听子组件，vue会默认挂载到其根元素
   */
  inheritAttrs: false,
  name: "",
  components: {},
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
   * 作用：
   * 1.异步获取数据，因为其本身即为异步
   * 2.provide和inject只能存在于setup中
   * @param {*} props 等同于当前组件的props
   * @param {*} context 非响应式即允许解构，但attrs和slots不能再解构
   */
  setup(props: Data, { attrs, slots, emit }: SetupContext) {
    /**
     * @description toRefs(object) 将对于响应式对象的引用转换为对普通对象的引用
     * 1.默认props对象本身是响应式，但注意假如需要解构其中的属性则需要通过toRefs进行包裹
     * 2.注意对于引用类型的props的属性，在子组件内修改仍会影响到父组件，建议传递基本类型即可
     * 3.假如直接访问解构的变量由于proxy的拦截得到的是深拷贝的值，只有通过toRefs转换为对于原始对象的引用才能不丢失响应式
     * 4.即解构object取出其中所有的属性都转换为ref
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
     * @description watch(tar,cb,options?)
     * @param {*} tar 监听目标，可为[]或'obj.property'以实现监听多个数据源或单个数据源的单个属性
     * @param {*} cb 回调：接收三个参数：新老值和onInvalidate
     * @param {*} options 可选配置：deep，immediate，onTrack，onTrigger
     * 1.watch钩子返回的function可以直接stop()以停止监听tar
     * 2.onInvalidate：改变副作用刷新时机
     * 当watch的监听源发生变化时，或watch本身被stop之后，我们期望能够清除那些无效的异步任务
     * 3.onTrack：调试
     * 4.onTrigger：调试
     * 5.watch功能在watchEffect的基础上拓展即建议首选watch即可
     */
    const stopA = watch(
      count,
      (n, o, onInvalidate) => {
        // 执行异步任务，并得到关闭异步任务的 timerId
        const timerId = asyncPrint(keywords);
        //如果 watch 监听被重复执行了，则会先清除上次未完成的异步任务
        onInvalidate(() => {
          clearTimeout(timerId);
        });
      },
      {
        deep: true,
        immediate: true,
        onTrack: () => {
          console.log(arguments);
        },
        onTrigger: () => {
          console.log(arguments);
        }
      }
    );
    //终止监听，注意不可逆，setup中return可用于当前组件的method等属性中
    //stopA()
    /**
     * @param onInvalidate
     * @param options
     * 1.立即执行，相当于watch的immediate:true
     * 2.除了手动调用stop，watch和watchEffect的stop会自动注入beforeDestroy并停止
     * 3.凡是在副作用回调内出现的响应式变量发生变化都会自动执行其中的回调而不像watch分离源和副作用回调
     * 4.flush:默认pre，还可选post和sync
     */
    const stopB = watchEffect(onInvalidate => {}, {
      flush: "pre",
      //flush:'post',
      //flush:'sync',
      onTrack: () => {},
      onTrigger: () => {}
    });
    /**
     * @param {function} getter 返回不可变即readonly的ref
     * @param {function} setter 可选
     * 1.由于所有的钩子都属于setup的作用域所以直接使用此处定义的变量而无需使用this
     * 2.可以获取computed返回的ref但不应该修改它而应该修改该ref依赖的变量
     * 3.setter通过fullName.value = val实现修改任何的值但建议修改跟getter有关的依赖其一即可
     */
    const fullName = computed({
      getter: () => `${userInfo.name} hui`,
      setter: (val: any) => {
        userInfo.name = val;
      }
    });
    /**
     * 注入生命周期钩子
     * @param {*} cb 注入当前组件生命周期中的回调
     * @param {*} ComponentInternalInstance
     * 1.第一个参数为回调，在setup外部的mounted之前执行
     * 2.接收参数与setup相同即props和context
     */
    //onMounted(() => {}, {});
    const getUserInfo = async () => {};
    /**
     * 返回值将会注入并覆盖组件属性，ref会进行展开
     * function则默认注入组件内的methods，其余注入data
     */
    return {
      count,
      userInfo,
      getUserInfo,
      p1,
      stopA,
      stopB
    };
  },
  //以下为当前组件原生属性
  methods: {},
  computed: {},
  watch: {},
  data: () => ({}),
  mounted() {}
};
</script>

<style scoped>
</style>

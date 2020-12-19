<script lang="ts">
import { watch, watchEffect, ref } from "vue";
export default {
  setup() {
    const count = ref(0);
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
        /*         const timerId = asyncPrint(keywords);
        //如果 watch 监听被重复执行了，则会先清除上次未完成的异步任务
        onInvalidate(() => {
          clearTimeout(timerId);
        }); */
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
  }
};
</script>
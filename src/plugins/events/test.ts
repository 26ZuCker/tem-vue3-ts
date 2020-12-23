import { watch } from 'vue';
//touch 事件，我们不光要绑定事件和解绑时间，还需要在不同回调中共用一个副作用变量，我们就可以把它拆成 composable函数
export function useTouch(domRef, ref) {
  // 是否touch进行中标志位
  let initiated = false;
  // 监听domRef改变
  watch(domRef, (el, prev, onCleanup) => {
    const touchStart = (e: TouchEvent) => {
      e.preventDefault();
      initiated = true;
      callbacks.touchStart(e);
    };
    const touchMove = (e: TouchEvent) => {
      e.preventDefault();
      if (!initiated) return;
      callbacks.touchMove(e);
    };
    const touchEnd = (e: TouchEvent) => {
      initiated = false;
      callbacks.touchEnd(e);
    };

    el.addEventListener('touchstart', touchStart);
    el.addEventListener('touchmove', touchMove);
    el.addEventListener('touchend', touchEnd);
    // 取消绑定
    onCleanup(() => {
      el.removeEventListener('touchstart', touchStart);
      el.removeEventListener('touchmove', touchMove);
      el.removeEventListener('touchend', touchEnd);
    });
  });
}

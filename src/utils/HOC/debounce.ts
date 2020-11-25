/**
 * 防抖，默认以最后一次为准
 * @param {()=>any} func
 * @param {number} wait
 * @param {boolean} immediate true则立即触发，防抖默认false
 */
const debounce = (func: () => any, wait = 50, immediate = false) => {
  let timer: number | null;
  return function() {
    const context = this,
      args = arguments;
    if (timer) clearTimeout(timer);
    if (immediate) {
      let callNow = !timer;
      timer = setTimeout(() => {
        timer = null;
      }, wait);
      if (callNow) func.apply(context, args);
    } else {
      timer = setTimeout(() => {
        func.apply(context, args);
      }, wait);
    }
  };
};
export default debounce;

/**
 * 格式化时间戳格式为yyyy-mm-dd，注意此处为computed，需要在钩子中使用需取返回值作函数
 */
function formatTime() {
  return function(inputTime: number, isDate = true) {
    const date = new Date(inputTime);
    let m: string | number = date.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    let d: string | number = date.getDate();
    d = d < 10 ? '0' + d : d;
    if (!isDate) {
      let h: string | number = date.getHours();
      h = h < 10 ? '0' + h : h;
      let minute: string | number = date.getMinutes();
      minute = minute < 10 ? '0' + minute : minute;
      return date.getFullYear() + '-' + m + '-' + d + ' ' + h + ':' + minute;
    }
    return date.getFullYear() + '-' + m + '-' + d;
  };
}
export default formatTime;

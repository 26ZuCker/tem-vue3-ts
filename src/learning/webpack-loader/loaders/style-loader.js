/**
 * 为入口html新建<style></style>并将sass-loader转换后的css源码放入
 */
module.exports = function(source) {
  const res = `const ele = document.createElement('style');
  ele.innerHTML = ${JSON.stringify(source)};
  document.head.appendChild(ele);
  `;
  this.callback(null, res);
};

/**引入sass以解析其语法为浏览器可识别的css */
const sass = require('sass');
/**
 * 实现sass-loader，需要css，style一共三个loader
 */
module.exports = function(source) {
  sass.render(source, (e, output) => {
    this.callback(e, output.css);
  });
};

const str = 'abc';

const reg1 = /<(h1)>.+?<\/\1>/;
str.match(reg);

const reg2 = /(abc)/;
console.log(RegExp.$1);
str.replace(reg, '$1$1');

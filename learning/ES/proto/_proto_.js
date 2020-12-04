var Person = function(name, age) {
  this.name = name;
  this.age = age;
};
//两种新增属性方式
Person.prototype.showInfo = function() {
  //展示信息
  console.log('My name is ' + this.name, ", I'm " + this.age + ' years old!');
};
Person.prototype = {
  showInfo: function() {
    //展示信息
    console.log('My name is ' + this.name, ", I'm " + this.age + ' years old!');
  },
};
Person.prototype = {
  constructor: Person,
  showInfo: function() {
    //展示信息
    console.log('My name is ' + this.name, ", I'm " + this.age + ' years old!');
  },
};

const a = { name: 'a' };

console.log(a);

console.log(a.toString());
const b = ['1', '2'];

console.log(b);
//重写：1,2
console.log(b.toString());
//原生：function Object() { [native code] }
console.log(Object.toString(b));
//原生原型：[object Object]
console.log(Object.prototype.toString(b));
//原生但call：[object Array]
console.log(Object.prototype.toString.call(b));

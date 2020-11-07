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

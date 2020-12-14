//以下均基于es5实现继承，因为本来es6就有extends语法糖
function extends1(subType, superType) {
  subType.prototype = Object.create(superType.prototype, {
    constructor: {
      enumerable: false,
      configurable: true,
      writable: true,
      value: subType,
    },
  });
  //ES6的class允许子类继承父类的静态方法和静态属性而普通的寄生组合式继承只能做到实例与实例之间的继承，对于类与类之间的继承需要额外定义方法
  //通过Object.setPrototypeOf 将 superType 设置为 subType 的原型，从而能够从父类中继承静态方法和静态属性
  Object.setPrototypeOf(subType, superType);
}

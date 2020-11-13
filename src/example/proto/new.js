//比较new和直接构造函数关系
function A(name) {
  this.name = name;
  return;
}
const a = new A();
const b = A();

console.log(a);
console.log(b);

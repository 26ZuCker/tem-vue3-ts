Function.prototype.myCall = function(context) {
  if (typeof context === 'undefined' || context === null) context = window;
  context.fn = this;
  let args = [...arguments].slice(1);
  let r = context.fn(...args);
  delete context.fn;
  return r;
};
Function.prototype.myApply = function(context) {
  if (typeof context === 'undefined' || context === null) context = window;
  context.fn = this;
  let args = arguments[1];
  let r;
  if (args) r = context.fn(...args);
  else r = context.fn();
  delete context.fn;
  return r;
};
Function.prototype.myBind = function(context) {
  return func;
};
var str = 'str';
function b() {
  this.name = `${str}`;
  console.log(this.name);
}
b();
var c = {
  age: 'b',
  func: function() {
    console.log(this);
  },
};
var a = { age: 'c' };

let a = function() {
  console.log(this);
};
let b = () => {
  console.log(this);
};
let c = { a, b, c: 1 };
c.a();
c.b();

var a = 1;
function b() {
  a = 3;
  var a = 2;
}
b();
console.log(a); //1

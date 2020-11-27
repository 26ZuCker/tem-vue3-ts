function evil(fn) {
    var Fn = Function; //一个变量指向Function，防止有些前端编译工具报错
    return new Fn('return ' + fn)();
}
const a=26
console.log(evil('a'))

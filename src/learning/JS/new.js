/* 
new obj()流程：创建一个继承obj.prototype的对象，假如有参则调用obj()构造函数，并将this绑定到新对象上 
构造函数返回的对象即new obj()的结果，假如构造函数无返回对象，需手动返回
要考虑到原构造函数的return，三种情况
object
无返回值
非object
*/
function create(...rest){
    //下面两行为假如原构造函数返回值非对象准备
    //获得rest中第一个参数即需要new的构造函数，并从rest中除去
    var con=[].shift.call(rest)
    //var con=rest.shift()
    //显示绑定this指向obj
    var ret=con.apply(obj,rest)
    //创建一个新的实例对象obj的_proto_指向构造函数原型prototype
    var obj=new Object()
    obj._proto_=con.prototype
    //可简化为递归
    //var obj=Object.create(con.prototype)
    //var a=new obj()原本是要返回一个对象,需要判断返回值，非对象则返回新建的obj
    return typeof ret==='object'?ret:obj
}
/* function f1(color,name){
    this.color=color
    this.name=name
}
var f2=create(f1,'red','zeng')
console.log(f2.name) */

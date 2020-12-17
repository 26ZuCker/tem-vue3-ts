//以下为ts中特殊关键字

//!1
//x! 将从 x 值域中排除 null 和 undefined，常用于函数参数中
//注意这只是代码层面，经过ts编译器后生成的js是直接去除不做其他任何改变
function myFunc(maybeString: string | undefined | null) {
  //const onlyString: string = maybeString; // Error
  const ignoreUndefinedAndNull: string = maybeString!; // Ok
}

//!2
//可选链?.与&&运算符行为略有不同，&& 专门用于检测 falsy 值
//falsy即经过强制类型转换为false的值，js内有8种：'', 0, -0, 0n, null, undefined, NaN
//而?.只会验证对象是否为 null 或 undefined，对于 0 或空字符串来说不会短路
//本质上可选链会返回undefined但编译后使用void 0代替undefined，参考https://juejin.cn/post/6844903796973830158
const a = { b: 1 };
if (a && a.b) {
}
if (a?.b) {
}
/**
 * if(a?.b){ } 编译后的ES5代码如下
 * if(
 *  a === null || a === void 0
 *  ? void 0 : a.b) {
 * }
 * 即a?.b -> a === null || a === void 0 ? void 0 : a.b
 */

//!3
//空值运算符??与可选链不同：前者只当左侧操作数为null或undefined时返回右侧的操作数否则返回左侧的操作数
//注意不能在不加括号的情况下与两个短路符即&&和||共用
const foo = null ?? 'default string';
const baz = 0 ?? 42;
/* 
上述转换如下
var _a, _b;
输出"default string"
var foo = (_a = null) !== null && _a !== void 0 ? _a : 'default string';
输出0
var baz = (_b = 0) !== null && _b !== void 0 ? _b : 42; 
以下会报错
null || undefined ?? "foo";
以下正常
(null || undefined ) ?? "foo"; // 返回 "foo"
*/

//可选链和空值常用如下
interface Customer {
  name: string;
  city?: string;
}

let customer: Customer = {
  name: 'Semlinker',
};

let customerCity = customer?.city ?? 'Unknown city';

//!4
//keyof获取key类型
interface A<T> {
  [key: string]: T;
}
let keys: keyof A<number>; //string
//T[U]是索引访问操作符，U是一个属性名称，索引类型查询操作符和索引访问操作符
let value: A<number>['antzone']; //number

interface B {
  webName: string;
  age: number;
  address: string;
}
type b = keyof B;

interface C {
  //address: true;
  [k: string]: boolean;
}
type c = keyof C;

//!5
//readonly只限制属性只读而不会把属性的属性也变成只读
const v = { k1: 1, k2: { k21: 2 } };
const v_ro = v as Readonly<typeof v>;
//递归实现deepReadonly
type DeepReadonly<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>;
};
const v_deep_ro = (v as any) as DeepReadonly<typeof v>;

//!6
//ts内置工具类型；Partial<T>，Required<T>

//!7
//合并类型

//!8
//判断类型is

//!9
//四种方式实现类型保护：in，typeof，instanceof，is
//is一般只用于编写判断类型函数因为规定了传入的参数一定为某种类型以从编译器就判断类型
function isNumber(x: any): x is number {
  return typeof x === 'number';
}

//!10
//断言类型断言好比其他语言里的类型转换但是不进行特殊的数据检查和解构
//没有运行时的影响，只是在编译阶段起作用
let someValue: any = 'this is a string';
let strLength1: number = (<string>someValue).length;
let strLength2: number = (someValue as string).length;

//!11
//私有变量#和private
//注意#需要在tsconfig内设置target为es6及以上，因为编译后是使用es6的WeakMap存储
class Person {
  #name: string;
  private age:number
  constructor(name: string,age:number) {
    this.#name = name;
    this.age=age
  }
  greet() {
    console.log(`Hello, my name is ${this.#name}!`);
  }
}


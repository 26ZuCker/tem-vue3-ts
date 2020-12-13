//以下为ts中特殊关键字

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

//readonly只限制属性只读而不会把属性的属性也变成只读
const v = { k1: 1, k2: { k21: 2 } };
const v_ro = v as Readonly<typeof v>;
//递归实现deepReadonly
type DeepReadonly<T> = {
  readonly [P in keyof T]: DeepReadonly<T[P]>;
};
const v_deep_ro = (v as any) as DeepReadonly<typeof v>;

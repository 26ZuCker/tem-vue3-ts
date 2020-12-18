declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
/**
 * 用于Object类型且需要增删属性的变量
 */
interface _Obj<T=any>{
  [key:string]:T
}
/**
 * 用于描述...rest使用any[]而非Array<any>减少代码量以减少http传输需要传输的数据量
 */
type _Rest=any[]
/**
 * 为每一个属性实现readonly
 */
type _Readonly<T> = {
  readonly [P in keyof T]: T[P];
};
/**
 * 深层readonly
 */
type _DeepReadonly<T> = {
  readonly [P in keyof T]: _DeepReadonly<T[P]>;
};
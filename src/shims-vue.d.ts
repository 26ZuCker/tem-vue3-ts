declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
/**
 * 用于Object类型且需要增删属性的变量
 */
interface _obj<T=any>{
  [key:string]:T
}
/**
 * 用于描述...rest
 */
type _rest=any[]
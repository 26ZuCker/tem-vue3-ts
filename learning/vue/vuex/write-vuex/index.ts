/**
 * 通过ts实现简易vuex
 * 需要使用Advanced Type，Generics，Mapped types，Distributive Conditional Types和Infer
 * 使用如下：
 * @example
 * const store = new Vuex({state:{
 *   count:0
 * }, action:{
 *   async ADD(state, payload){}
 * }})
 */
export default class Vuex<S, A> {
  /**
   * 状态
   */
  state: S;
  /**
   * 异步，注意不应该通过实例的点运算符直接调用
   */
  private action: Actions<S, A>;
  constructor({ state, action }: { state: S; action: Actions<S, A> }) {
    this.state = state;
    this.action = action;
  }
  dispatch(action: any) {}
}
/**
 * Mapped types
 * 遍历了传入的A的key值，然后定义每一项实际上的结构
 * 由于使用store.dispatch({type:'ADD'})需要使用action的key的类型如
 */
export type Actions<S, A> = {
  [K in keyof A]: (state: S, payload: any) => Promise<any>;
};
interface A {
  name: string;
  age: number;
  [key: string]: any;
}
type b = keyof A;

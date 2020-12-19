import { defineComponent,render,h,computed,createApp,isRef } from "vue";
import Son from '../Son/Son.vue'
/**
 * 使用jsx语法必须使用defineComponent
 */
const Son2 = defineComponent({
  components:{
    Son
  },
  setup(){
    return (
      <div> 
        <Son></Son>
      </div>
    )
  },
  //render优先级高于setup和template
  render(){
    return(
      <div></div>
    )
  }
})

//命令式渲染标签，用于手动增加元素节点
//render(h('div'),document.getElementById('id')!)

const app = createApp({})

const Son1 = app.component('Son',{
  // template:``,
  // props:{},
  render(){
    // return(
    //   <div>
    //     <Son></Son>
    //   </div>
    // )
    return h(h('div'),document.getElementById('id')!)
  }
})

const vnode1=h(Son1)
const vnode2=h(Son2)

//render(Son1,document.getElementById('id')!)
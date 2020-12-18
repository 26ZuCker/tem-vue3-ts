import { defineComponent,render,h } from "vue";
import Son from '../Son/Son.vue'
/**
 * 使用jsx语法必须使用defineComponent
 */
export default defineComponent({
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
})
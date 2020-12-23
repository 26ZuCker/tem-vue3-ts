import { ref, reactive, Teleport, KeepAlive, defineComponent, withModifiers } from 'vue';

import { AddressList, NavBar, Toast, Popup } from 'vant';
import AddressEdit from './AddressEdit';

import Router, { createWebHistory, RouterOptions } from 'vue-router';
const routerOptions: RouterOptions = {
  history: createWebHistory(),
  routes: [],
};
const router = Router.createRouter(routerOptions);

export default defineComponent({
  setup() {
    const chosenAddressId = ref('1');
    const showEdit = ref(false);
    const list = reactive([
      {
        id: '1',
        name: '张三',
        tel: '13000000000',
        address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
        isDefault: true,
      },
      {
        id: '2',
        name: '李四',
        tel: '1310000000',
        address: '浙江省杭州市拱墅区莫干山路 50 号',
      },
    ]);
    const disabledList = reactive([
      {
        id: '3',
        name: '王五',
        tel: '1320000000',
        address: '浙江省杭州市滨江区江南大道 15 号',
      },
    ]);

    const onAdd = () => {
      showEdit.value = true;
    };
    const onEdit = (item: any, index: string) => {
      Toast('编辑地址:' + index);
    };
    const onClickLeft = () => {
      router.back();
    };
    const onClickRight = () => {
      router.push('/todoList');
    };
    /**
     * 函数式组件，但本质只是通过函数返回的元素标签，不同于vue2中所谓的functional，尽管后者3中已取消
     */
    const com1=()=>(<h1>functional component</h1>)
    /**
     * 写法更改主要在对于指令替代使用，指令.修饰符，双括改为单
     * 事件指令即v-on：
     * v-model：
     * v-bind：
     * v-for：
     * v-if和v-show：
     * 注意jsx只能单个根节点
     */
    return (
      <d>
        <div style='background:#f7f8fa'>
          <NavBar
            title='地址管理'
            left-text='返回'
            right-text='Todo'
            left-arrow
            onClick-left={onClickLeft}
            onClick-right={onClickRight}
          />
          <Teleport to='body'></Teleport>
          <KeepAlive>
            {com1()}
          </KeepAlive>
          <AddressList
            vModel={chosenAddressId.value}
            list={list}
            disabledList={disabledList}
            disabledText='以下地址超出配送范围'
            defaultTagText='默认'
            onAdd={onAdd}
            onEdit={onEdit}
          />
        </div>
        <Popup vModel={[showEdit.value, 'show']} position='bottom' round style='height: 80%'>
          <AddressEdit />
        </Popup>
      </div>
    );
  },
  render() {
    return (
      <>
        <div v-model='aa'></div>
        <div v-show></div>
        <div v-for></div>
      </>
    );
  },
});

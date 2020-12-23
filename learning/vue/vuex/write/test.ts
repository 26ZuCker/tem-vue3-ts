import Vuex from './index';

const store = new Vuex({
  state: {
    count: 1,
  },
  //可以通过以下两种语法定义key
  action: {
    async ADD(state, count) {
      state.count = count;
    },
    async ['COUNT'](state, count) {
      state.count = count;
    },
  },
});

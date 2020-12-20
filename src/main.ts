import { createApp, App, AppContext, AppConfig, defineComponent } from 'vue';
import * as _APP from './App.vue';
import router from './router';
import store from './store';

import directiveInject from './plugins/directive';

// const appConfig: AppConfig = {};

// const appCtx: App = {
//   config: appConfig,
// };

const index = defineComponent({
  setup() {},
  render() {},
});

const index2 = {
  setup() {},
};

const app = createApp(_APP);

//custom directive
directiveInject(app);

//plugin & mount
app
  .use(store)
  .use(router)
  .mount('#app');

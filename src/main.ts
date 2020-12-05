import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import directiveInject from './plugins/directive';

const app = createApp(App);

//custom directive
directiveInject(app);

//plugin & mount
app
  .use(store)
  .use(router)
  .mount('#app');

import { App } from 'vue';
import focus from './focus';

const directiveMap: _Obj = {
  focus,
};
/**
 * 迭代安装指令
 * v-mydirective:[argument]="value"
 * binding.arg=argument
 * binding.value=value
 * @param app
 */
function directiveInject(app: App) {
  for (const key in directiveMap) {
    app.directive(key, directiveMap[key]);
  }
}

export default directiveInject;

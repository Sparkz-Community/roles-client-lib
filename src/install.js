import { abilitiesPlugin} from '@casl/vue';
import { Ability, subject } from '@casl/ability';

import * as components from './components';

const install = (Vue, {prefix} = {}) => {
  for (let key in components) {
    let _key = prefix ? prefix + key : key;
    Vue.component(_key, components[key]);
  }

  Vue.use(abilitiesPlugin, new Ability);
  // Vue.prototype.$createEntity = function (path, item) {
  //   const classFn =  new Function('item', `return new class ${path} {constructor(args) {Object.assign(this, item)}}`);
  //   const newClass = classFn(item);
  //   return newClass;
  // };
  Vue.prototype.$subject = subject;
};

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default { install };

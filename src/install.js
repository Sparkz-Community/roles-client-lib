import { abilitiesPlugin} from '@casl/vue';
import { Ability, subject } from '@casl/ability';

import * as components from './components';

const install = (app, {prefix, loadComponents = true} = {}) => {
  for (let key in components) {
    let _key = prefix ? prefix + key : key;
    app.component(_key, components[key]);
  }

  if (loadComponents) {
    for (let key in components) {
      let _key = prefix ? prefix + key : key;
      app.component(_key, components[key]);
    }
  }

  app.use(abilitiesPlugin, new Ability);
  // Vue.prototype.$createEntity = function (path, item) {
  //   const classFn =  new Function('item', `return new class ${path} {constructor(args) {Object.assign(this, item)}}`);
  //   const newClass = classFn(item);
  //   return newClass;
  // };
  app.prototype.$subject = subject;
};

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default { install };

import { abilitiesPlugin} from '@casl/vue';
import { Ability, subject } from '@casl/ability';

import * as components from './components';

const install = (app, {prefix, loadComponents = true} = {}) => {
  if (loadComponents) {
    for (let key in components) {
      let _key = prefix ? prefix + key : key;
      app.component(_key, components[key]);
    }
  }

  app.use(abilitiesPlugin, new Ability);

  function createEntity(path, item) {
    const classFn =  new Function('item', `return new class ${path} {constructor(args) {Object.assign(this, item)}}`);
    return classFn(item);
  }
  app.config.globalProperties.$createEntity = createEntity;
  app.provide('$createEntity', createEntity);

  app.config.globalProperties.$subject = subject;
  app.provide('$subject', subject);
};

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default { install };

import {defineStore, BaseModel} from 'feathers-pinia';
import {lodash, hookCustomizer} from '@sparkz-community/common-client-lib';

const {$lisNil, $lmergeWith} = lodash;

export class Roles extends BaseModel {
  constructor(data, options) {
    super(data, options);
  }
}

export default async (
  {
    FeathersClient,
    extend_hooks = {},
    extend_class_fn = (superClass) => superClass,
    idField = '_id',
    state = {},
    getters = {},
    actions = {},
  } = {}) => {
  if ($lisNil(FeathersClient)) {
    throw Error('FeathersClient argument was be set');
  }
  const {
    default: feathersClient,
  } = typeof FeathersClient === 'function' ? await FeathersClient() : FeathersClient;

  Roles.instanceDefaults = function () {
    return {
      name: '',
      abilityIds: [],
      whitelist: [],
      blacklist: [],
      active: true,
    };
  };

  let Model = Roles;
  if (typeof extend_class_fn === 'function') {
    Model = extend_class_fn(Roles);
  }

  const servicePath = 'roles';
  const useStore = defineStore({
    Model,
    servicePath,
    clients: {api: feathersClient},
    idField,
    state,
    getters,
    actions,
  });

  // Set up the client-side Feathers hooks.
  feathersClient.service(servicePath).hooks($lmergeWith({
    before: {
      all: [/*beforeHook*/],
      find: [],
      get: [],
      create: [],
      update: [],
      patch: [],
      remove: [],
    },
    after: {
      all: [],
      find: [],
      get: [],
      create: [],
      update: [],
      patch: [],
      remove: [],
    },
    error: {
      all: [],
      find: [],
      get: [],
      create: [],
      update: [],
      patch: [],
      remove: [],
    },
  }, extend_hooks, hookCustomizer));

  return useStore;
};

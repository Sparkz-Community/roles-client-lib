import {defineStore, BaseModel} from 'feathers-pinia';
import {lodash, hookCustomizer} from '@sparkz-community/common-client-lib';

const {$lisNil, $lmergeWith} = lodash;

export class Abilities extends BaseModel {
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
    state = () => ({}),
    getters = {},
    actions = {},
  } = {}) => {
  if ($lisNil(FeathersClient)) {
    throw Error('FeathersClient argument was be set');
  }
  const {
    default: feathersClient,
  } = typeof FeathersClient === 'function' ? await FeathersClient() : FeathersClient;

  // Define default properties here
  Abilities.instanceDefaults = function (/*data, {models, stores}*/) {
    return {
      name: '',
      inRoles: [],
      rules: [],
      createdBy: null,
      updatedBy: null,
      active: true,
    };
  };


  let Model = Abilities;
  if (typeof extend_class_fn === 'function') {
    Model = extend_class_fn(Abilities);
  }

  const servicePath = 'abilities';
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
      all: [],
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

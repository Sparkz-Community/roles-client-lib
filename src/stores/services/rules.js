import {defineStore, BaseModel} from 'feathers-pinia';
import {lodash, hookCustomizer} from '@sparkz-community/common-client-lib';

const {$lisNil, $lmergeWith} = lodash;

export class Rules extends BaseModel {
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

  Rules.instanceDefaults = function () {
    return {
      name: undefined,
      note: undefined,
      inAbilities: [],
      action: [],
      subject: undefined,
      fields: [],
      conditions: {},
      reason: undefined,
      inverted: false,
      createdBy: undefined,
      updatedBy: undefined,
      active: true,
    };
  };

  let Model = Rules;
  if (typeof extend_class_fn === 'function') {
    Model = extend_class_fn(Rules);
  }

  const servicePath = 'rules';
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

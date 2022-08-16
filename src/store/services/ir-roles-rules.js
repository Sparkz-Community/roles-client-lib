import {defineStore, BaseModel} from 'feathers-pinia';
import {diff, lodash, hookCustomizer} from '@sparkz-community/common-client-lib';

const {$lisNil, $lmergeWith} = lodash;

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

  class IrRolesRules extends BaseModel {
    constructor(data, options) {
      super(data, options);
    }
  }

  IrRolesRules.diffOnPatch = function (data) {
    console.log('diffOnPatch data', data);
    if (data['_id']) {
      const originalObject = IrRolesRules.store.state['ir-roles-rules'].keyedById[data['_id']];
      return diff(originalObject, data);
    } else {
      return data;
    }
  };

  IrRolesRules.instanceDefaults = function () {
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

  let Model = IrRolesRules;
  if (typeof extend_class_fn === 'function') {
    Model = extend_class_fn(IrRolesRules);
  }

  const servicePath = 'ir-roles-rules';
  const useRulesStore = defineStore({
    Model,
    servicePath,
    clients: {api: feathersClient},
    idField,
    state,
    getters,
    actions,
  });

  // const beforeHook = context => {
  //   // eslint-disable-next-line no-console
  //   console.log('------------->>>> beforeHook - context.method:', context.method);
  //   console.log('------------->>>> beforeHook - context.params:', context.params);
  //   console.log('------------->>>> beforeHook - context.data:', context.data);
  // };

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

  return useRulesStore;
};

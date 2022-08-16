import {defineStore, BaseModel} from 'feathers-pinia';
import {diff, lodash, hookCustomizer} from '@sparkz-community/common-client-lib';

const {$lisNil, $lmergeWith} = lodash;

export default async (
  {
    FeathersClient,
    extend_hooks = {},
    extend_class_fn = (superClass) => superClass,
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

  class IrRolesRoles extends BaseModel {
    constructor(data, options) {
      super(data, options);
    }
  }

  IrRolesRoles.modelName = 'IrRolesRoles';

  IrRolesRoles.diffOnPatch = function (data) {
    console.log('diffOnPatch data', data);
    if (data['_id']) {
      const originalObject = IrRolesRoles.store.state['ir-roles-roles'].keyedById[data['_id']];
      return diff(originalObject, data);
    } else {
      return data;
    }
  };

  IrRolesRoles.instanceDefaults = function () {
    return {
      name: '',
      abilityIds: [],
      whitelist: [],
      blacklist: [],
      active: true,
    };
  };

  let Model = IrRolesRoles;
  if (typeof extend_class_fn === 'function') {
    Model = extend_class_fn(IrRolesRoles);
  }

  const servicePath = 'ir-roles-roles';
  const useRolesStore = defineStore({
    Model,
    servicePath,
    clients: {api: feathersClient},
    idField: '_id',
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

  // Setup the client-side Feathers hooks.
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

  return useRolesStore;
};

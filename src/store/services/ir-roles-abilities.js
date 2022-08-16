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

  class IrRolesAbilities extends BaseModel {
    constructor(data, options) {
      super(data, options);
    }

    // Define default properties here
    static instanceDefaults(/*data, {models, store}*/) {
      return {
        name: '',
        inRoles: [],
        rules: [],
        createdBy: null,
        updatedBy: null,
        active: true,
      };
    };

    static diffOnPatch(data) {
      console.log('diffOnPatch data', data);
      if (data['_id']) {
        const originalObject = IrRolesAbilities.store.state['ir-roles-abilities'].keyedById[data['_id']];
        return diff(originalObject, data);
      } else {
        return data;
      }
    };
  }

  let Model = IrRolesAbilities;
  if (typeof extend_class_fn === 'function') {
    Model = extend_class_fn(IrRolesAbilities);
  }

  const servicePath = 'ir-roles-abilities';
  const useAbilitiesStore = defineStore({
    Model,
    servicePath,
    clients: {api: feathersClient},
    idField: '_id',
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

  return useAbilitiesStore;
};

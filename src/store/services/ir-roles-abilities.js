import {diff, lodash} from '@sparkz-community/common-client-lib';

const {$lget, $lmergeWith, $lisNil} = lodash;

Array.prototype.insert = function (index, ...value) {
  this.splice(index, 0, ...value);
  return this;
};

function hookCustomizer(obj_value, src_value) {
  if (Array.isArray(obj_value)) {
    let list = [...obj_value];
    for (let item of src_value) {
      let set_index = $lget(item, 'index', undefined);
      let set_value = $lget(item, 'value', undefined);
      if (item instanceof Object && !Array.isArray(item) && set_index !== undefined && set_value !== undefined) {
        list.insert(set_index, set_value);
      } else {
        list.push(item);
      }
    }
    return list;
  }
}

export default async (
  {
    FeathersClient,
    extend_hooks = {},
    extend_class_fn = (superClass) => superClass,
    state = {},
    getters = {},
    mutations = {},
    actions = {},
  } = {}) => {
  if ($lisNil(FeathersClient)) {
    throw Error('FeathersClient argument was be set');
  }
  const {default: feathersClient, makeServicePlugin, BaseModel} = typeof FeathersClient === 'function' ? await FeathersClient() : FeathersClient;

  class IrRolesAbilities extends BaseModel {
    constructor(data, options) {
      super(data, options);
    }
  }

  IrRolesAbilities.modelName = 'IrRolesAbilities';

  IrRolesAbilities.diffOnPatch = function (data) {
    console.log('diffOnPatch data', data);
    if (data['_id']) {
      const originalObject = IrRolesAbilities.store.state['ir-roles-abilities'].keyedById[data['_id']];
      return diff(originalObject, data);
    } else {
      return data;
    }
  };

  IrRolesAbilities.instanceDefaults = function () {
    return {
      name: '',
      inRoles: [],
      rules: [],
      createdBy: null,
      updatedBy: null,
      active: true,
    };
  };

  let Model = IrRolesAbilities;
  if (typeof extend_class_fn === 'function') {
    Model = extend_class_fn(IrRolesAbilities);
  }

  const servicePath = 'ir-roles-abilities';
  const servicePlugin = makeServicePlugin({
    Model,
    service: feathersClient.service(servicePath),
    servicePath,
    state,
    getters,
    mutations,
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

  return servicePlugin;
};

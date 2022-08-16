// plugins
import abilities, {Abilities} from './services/abilities';
import roles, {Roles} from './services/roles';
import rules, {Rules} from './services/rules';

const classes = {
  Abilities,
  Roles,
  Rules,
};

const stores = {
  abilities,
  roles,
  rules,
};

export default {
  classes,
  stores,
};

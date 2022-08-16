import { store } from 'quasar/wrappers';
import { createPinia } from 'pinia';
import useRulesStore from '@/store/services/ir-roles-rules';
import useRolesStore from '@/store/services/ir-roles-Roles';
import useAbilitiesStore from '@/store/services/ir-roles-abilities';

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store((/* { ssrContext } */) => {
  const pinia = createPinia();

  // You can add Pinia plugins here
  pinia.use(useRulesStore);
  pinia.use(useRolesStore);
  pinia.use(useAbilitiesStore);

  return pinia;
});

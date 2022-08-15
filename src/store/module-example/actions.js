
export default function actions() {
  return {
    test({commit}, payload) {
      commit('TEST', payload);
    },
  };
}

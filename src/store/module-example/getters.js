export default function getters() {
  return {
    test(state) {
      return `${state.test} ${state.new_test}`;
    }
  };
}

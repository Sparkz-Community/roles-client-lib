export default function mutations() {
  return {
    TEST(state, payload) {
      state.test = payload;
    },
  };
}

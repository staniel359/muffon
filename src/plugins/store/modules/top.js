export default {
  namespaced: true,
  state: {
    country: null
  },
  mutations: {
    SET_COUNTRY (
      state,
      value
    ) {
      state.country = value
    }
  },
  actions: {
    setCountry (
      {
        commit
      },
      value
    ) {
      commit(
        'SET_COUNTRY',
        value
      )
    }
  }
}

export default {
  namespaced: true,
  state: {
    info: null,
    isLoggedIn: false
  },
  mutations: {
    SET_INFO (state, value) {
      state.info = value
    },
    SET_IS_LOGGED_IN (state, value) {
      state.isLoggedIn = value
    }
  },
  actions: {
    setInfo ({ commit }, value) {
      commit('SET_INFO', value)
    },
    setIsLoggedIn ({ commit }, value) {
      commit('SET_IS_LOGGED_IN', value)
    }
  }
}

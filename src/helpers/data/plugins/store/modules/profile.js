export default {
  namespaced: true,
  state: {
    info: null,
    token: null,
    isLoggedIn: false,
    isRemember: false,
    language: null
  },
  mutations: {
    SET_INFO (
      state,
      value
    ) {
      state.info = value
    },
    SET_TOKEN (
      state,
      value
    ) {
      state.token = value
    },
    SET_IS_LOGGED_IN (
      state,
      value
    ) {
      state.isLoggedIn = value
    },
    SET_IS_REMEMBER (
      state,
      value
    ) {
      state.isRemember = value
    },
    SET_LANGUAGE (
      state,
      value
    ) {
      state.language = value
    }
  },
  actions: {
    setInfo (
      {
        commit
      },
      value
    ) {
      commit(
        'SET_INFO',
        value
      )
    },
    setToken (
      {
        commit
      },
      value
    ) {
      commit(
        'SET_TOKEN',
        value
      )
    },
    setIsLoggedIn (
      {
        commit
      },
      value
    ) {
      commit(
        'SET_IS_LOGGED_IN',
        value
      )
    },
    setIsRemember (
      {
        commit
      },
      value
    ) {
      commit(
        'SET_IS_REMEMBER',
        value
      )
    },
    setLanguage (
      {
        commit
      },
      value
    ) {
      commit(
        'SET_LANGUAGE',
        value
      )
    }
  }
}

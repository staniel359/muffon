export default {
  namespaced: true,
  state: {
    info: null,
    token: null,
    isRemember: false,
    language: 'en',
    isShowPlaying: false,
    timezone: 'UTC'
  },
  getters: {
    id (
      state
    ) {
      return state.info?.id?.toString()
    }
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
    },
    SET_IS_SHOW_PLAYING (
      state,
      value
    ) {
      state.isShowPlaying = value
    },
    SET_TIMEZONE (
      state,
      value
    ) {
      state.timezone = value
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
    },
    setIsShowPlaying (
      {
        commit
      },
      value
    ) {
      commit(
        'SET_IS_SHOW_PLAYING',
        value
      )
    },
    setTimezone (
      {
        commit
      },
      value
    ) {
      commit(
        'SET_TIMEZONE',
        value
      )
    }
  }
}

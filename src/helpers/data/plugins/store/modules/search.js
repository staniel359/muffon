export default {
  namespaced: true,
  state: {
    source: 'lastfm'
  },
  mutations: {
    SET_SOURCE (
      state,
      value
    ) {
      state.source = value
    }
  },
  actions: {
    setSource (
      {
        commit
      },
      value
    ) {
      commit(
        'SET_SOURCE',
        value
      )
    }
  }
}

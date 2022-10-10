export default {
  namespaced: true,
  state: {
    isWithAnnotations: false
  },
  mutations: {
    SET_IS_WITH_ANNOTATIONS (
      state,
      value
    ) {
      state.isWithAnnotations = value
    }
  },
  actions: {
    setIsWithAnnotations (
      {
        commit
      },
      value
    ) {
      commit(
        'SET_IS_WITH_ANNOTATIONS',
        value
      )
    }
  }
}

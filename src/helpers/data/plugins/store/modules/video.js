export default {
  namespaced: true,
  state: {
    isAutoplay: false
  },
  mutations: {
    SET_IS_AUTOPLAY (
      state,
      value
    ) {
      state.isAutoplay = value
    }
  },
  actions: {
    setIsAutoplay (
      {
        commit
      },
      value
    ) {
      commit(
        'SET_IS_AUTOPLAY',
        value
      )
    }
  }
}

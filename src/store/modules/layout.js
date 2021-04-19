export default {
  namespaced: true,
  state: {
    loaderDimmer: null,
    playerPanel: null,
    queuePanel: null,
    isQueuePanelVisible: false,
    navigationSections: []
  },
  mutations: {
    SET_LOADER_DIMMER (state, value) {
      state.loaderDimmer = value
    },
    SET_PLAYER_PANEL (state, value) {
      state.playerPanel = value
    },
    SET_QUEUE_PANEL (state, value) {
      state.queuePanel = value
    },
    SET_NAVIGATION_SECTIONS (state, value) {
      state.navigationSections = value
    },
    SET_IS_QUEUE_PANEL_VISIBLE (state, value) {
      state.isQueuePanelVisible = value
    }
  },
  actions: {
    setLoaderDimmer ({ commit }, value) {
      commit('SET_LOADER_DIMMER', value)
    },
    setPlayerPanel ({ commit }, value) {
      commit('SET_PLAYER_PANEL', value)
    },
    setQueuePanel ({ commit }, value) {
      commit('SET_QUEUE_PANEL', value)
    },
    setNavigationSections ({ commit }, value) {
      commit('SET_NAVIGATION_SECTIONS', value)
    },
    setIsQueuePanelVisible ({ commit }, value) {
      commit('SET_IS_QUEUE_PANEL_VISIBLE', value)
    }
  }
}

export default {
  namespaced: true,
  state: {
    playing: null,
    currentTrackId: null,
    currentVariantIndex: null,
    sourceId: null,
    variants: []
  },
  getters: {
    variantsCount (state) {
      return state.variants.length
    }
  },
  mutations: {
    SET_VARIANTS (state, value) {
      state.variants = value
    },
    SET_PLAYING (state, value) {
      state.playing = value
    },
    SET_CURRENT_TRACK_ID (state, value) {
      state.currentTrackId = value
    },
    SET_CURRENT_VARIANT_INDEX (state, value) {
      state.currentVariantIndex = value
    },
    SET_SOURCE_ID (state, value) {
      state.sourceId = value
    }
  },
  actions: {
    setVariants ({ commit }, value) {
      commit('SET_VARIANTS', value)
    },
    setPlaying ({ commit }, value) {
      commit('SET_PLAYING', value)
    },
    setCurrentTrackId ({ commit }, value) {
      commit('SET_CURRENT_TRACK_ID', value)
    },
    setCurrentVariantIndex ({ commit }, value) {
      commit('SET_CURRENT_VARIANT_INDEX', value)
    },
    setSourceId ({ commit }, value) {
      commit('SET_SOURCE_ID', value)
    }
  }
}

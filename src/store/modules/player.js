export default {
  namespaced: true,
  state: {
    playing: null,
    currentTrackId: null,
    currentVariantId: null,
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
    SET_CURRENT_VARIANT_ID (state, value) {
      state.currentVariantId = value
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
    setCurrentVariantId ({ commit }, value) {
      commit('SET_CURRENT_VARIANT_ID', value)
    },
    setSourceId ({ commit }, value) {
      commit('SET_SOURCE_ID', value)
    }
  }
}

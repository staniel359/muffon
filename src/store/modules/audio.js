export default {
  namespaced: true,
  state: {
    element: null,
    context: null,
    source: null,
    isAutoplay: false,
    isLoop: false,
    isMuted: false,
    isPlayable: false,
    currentTime: 0,
    duration: 0,
    progress: 0,
    volume: 1,
    status: 'stop'
  },
  getters: {
    action (state) {
      const statusActions = {
        play: 'pause',
        pause: 'play',
        stop: 'play'
      }

      return statusActions[state.status]
    }
  },
  mutations: {
    SET_ELEMENT (state, value) {
      state.element = value
    },
    SET_CONTEXT (state, value) {
      state.context = value
    },
    SET_SOURCE (state, value) {
      state.source = value
    },
    SET_DURATION (state, value) {
      state.duration = value
    },
    SET_PROGRESS (state, value) {
      state.progress = value
    },
    SET_IS_PLAYABLE (state, value) {
      state.isPlayable = value
    },
    SET_STATUS (state, value) {
      state.status = value
    },
    SET_CURRENT_TIME (state, value) {
      state.currentTime = value
    },
    SET_VOLUME (state, value) {
      state.volume = value
    },
    SET_IS_MUTED (state, value) {
      state.isMuted = value
    },
    SET_IS_LOOP (state, value) {
      state.isLoop = value
    },
    SET_IS_AUTOPLAY (state, value) {
      state.isAutoplay = value
    }
  },
  actions: {
    setElement ({ commit }, value) {
      commit('SET_ELEMENT', value)
    },
    setContext ({ commit }, value) {
      commit('SET_CONTEXT', value)
    },
    setSource ({ commit }, value) {
      commit('SET_SOURCE', value)
    },
    setDuration ({ commit }, value) {
      commit('SET_DURATION', value)
    },
    setProgress ({ commit }, value) {
      commit('SET_PROGRESS', value)
    },
    setIsPlayable ({ commit }, value) {
      commit('SET_IS_PLAYABLE', value)
    },
    setStatus ({ commit }, value) {
      commit('SET_STATUS', value)
    },
    setCurrentTime ({ commit }, value) {
      commit('SET_CURRENT_TIME', value)
    },
    setVolume ({ commit }, value) {
      commit('SET_VOLUME', value)
    },
    setIsMuted ({ commit }, value) {
      commit('SET_IS_MUTED', value)
    },
    setIsLoop ({ commit }, value) {
      commit('SET_IS_LOOP', value)
    },
    setIsAutoplay ({ commit }, value) {
      commit('SET_IS_AUTOPLAY', value)
    }
  }
}

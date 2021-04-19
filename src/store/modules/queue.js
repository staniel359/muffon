export default {
  namespaced: true,
  state: {
    currentTrackId: null,
    isShuffle: false,
    isFetchingPrev: false,
    isFetchingNext: false,
    tracks: [],
    tracksShuffled: []
  },
  getters: {
    tracksFormatted (state) {
      if (state.isShuffle) {
        return state.tracksShuffled
      } else {
        return state.tracks
      }
    },
    tracksLength (state) {
      return state.tracks.length
    },
    currentTrackIndex (state, getters) {
      return getters.tracksFormatted.findIndex(track => {
        return track.uuid === state.currentTrackId
      })
    },
    isStart (state, getters) {
      return getters.currentTrackIndex === 0
    },
    isEnd (state, getters) {
      return (
        getters.currentTrackIndex ===
          getters.tracksLength - 1
      )
    },
    prevTrack (state, getters) {
      return getters.tracksFormatted[
        getters.currentTrackIndex - 1
      ]
    },
    nextTrack (state, getters) {
      return getters.tracksFormatted[
        getters.currentTrackIndex + 1
      ]
    }
  },
  mutations: {
    SET_TRACKS (state, value) {
      state.tracks = value
    },
    SET_TRACKS_SHUFFLED (state, value) {
      state.tracksShuffled = value
    },
    SET_IS_SHUFFLE (state, value) {
      state.isShuffle = value
    },
    SET_CURRENT_TRACK_ID (state, value) {
      state.currentTrackId = value
    },
    SET_IS_FETCHING_PREV (state, value) {
      state.isFetchingPrev = value
    },
    SET_IS_FETCHING_NEXT (state, value) {
      state.isFetchingNext = value
    }
  },
  actions: {
    setTracks ({ commit }, value) {
      commit('SET_TRACKS', value)
    },
    setTracksShuffled ({ commit }, value) {
      commit('SET_TRACKS_SHUFFLED', value)
    },
    setIsShuffle ({ commit }, value) {
      commit('SET_IS_SHUFFLE', value)
    },
    setCurrentTrackId ({ commit }, value) {
      commit('SET_CURRENT_TRACK_ID', value)
    },
    setIsFetchingPrev ({ commit }, value) {
      commit('SET_IS_FETCHING_PREV', value)
    },
    setIsFetchingNext ({ commit }, value) {
      commit('SET_IS_FETCHING_NEXT', value)
    }
  }
}

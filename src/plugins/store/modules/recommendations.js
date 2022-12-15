export default {
  namespaced: true,
  state: {
    isHideLibraryArtists: false,
    tracksCount: 0
  },
  mutations: {
    SET_IS_HIDE_LIBRARY_ARTISTS (
      state,
      value
    ) {
      state.isHideLibraryArtists = value
    },
    SET_TRACKS_COUNT (
      state,
      value
    ) {
      state.tracksCount = value
    }
  },
  actions: {
    setIsHideLibraryArtists (
      {
        commit
      },
      value
    ) {
      commit(
        'SET_IS_HIDE_LIBRARY_ARTISTS',
        value
      )
    },
    setTracksCount (
      {
        commit
      },
      value
    ) {
      commit(
        'SET_TRACKS_COUNT',
        value
      )
    }
  }
}

export default {
  namespaced: true,
  state: {
    playing: null,
    currentTrackId: null,
    currentVariantId: null,
    sourceId: null,
    isWithScrobbling: false,
    isScrobbling: false,
    isToScrobble: false,
    isScrobbled: false,
    isWithScrobbleNotifications: false,
    scrobblePercent: 50,
    variants: []
  },
  getters: {
    variantsCount (
      state
    ) {
      return state.variants.length
    }
  },
  mutations: {
    SET_VARIANTS (
      state,
      value
    ) {
      state.variants = value
    },
    SET_PLAYING (
      state,
      value
    ) {
      state.playing = value
    },
    SET_CURRENT_TRACK_ID (
      state,
      value
    ) {
      state.currentTrackId = value
    },
    SET_CURRENT_VARIANT_ID (
      state,
      value
    ) {
      state.currentVariantId = value
    },
    SET_SOURCE_ID (
      state,
      value
    ) {
      state.sourceId = value
    },
    SET_IS_WITH_SCROBBLING (
      state,
      value
    ) {
      state.isWithScrobbling = value
    },
    SET_IS_TO_SCROBBLE (
      state,
      value
    ) {
      state.isToScrobble = value
    },
    SET_IS_SCROBBLED (
      state,
      value
    ) {
      state.isScrobbled = value
    },
    SET_IS_WITH_SCROBBLE_NOTIFICATIONS (
      state,
      value
    ) {
      state.isWithScrobbleNotifications = value
    },
    SET_SCROBBLE_PERCENT (
      state,
      value
    ) {
      state.scrobblePercent = value
    },
    SET_IS_SCROBBLING (
      state,
      value
    ) {
      state.isScrobbling = value
    }
  },
  actions: {
    setVariants (
      {
        commit
      },
      value
    ) {
      commit(
        'SET_VARIANTS',
        value
      )
    },
    setPlaying (
      {
        commit
      },
      value
    ) {
      commit(
        'SET_PLAYING',
        value
      )
    },
    setCurrentTrackId (
      {
        commit
      },
      value
    ) {
      commit(
        'SET_CURRENT_TRACK_ID',
        value
      )
    },
    setCurrentVariantId (
      {
        commit
      },
      value
    ) {
      commit(
        'SET_CURRENT_VARIANT_ID',
        value
      )
    },
    setSourceId (
      {
        commit
      },
      value
    ) {
      commit(
        'SET_SOURCE_ID',
        value
      )
    },
    setIsWithScrobbling (
      {
        commit
      },
      value
    ) {
      commit(
        'SET_IS_WITH_SCROBBLING',
        value
      )
    },
    setIsToScrobble (
      {
        commit
      },
      value
    ) {
      commit(
        'SET_IS_TO_SCROBBLE',
        value
      )
    },
    setIsScrobbled (
      {
        commit
      },
      value
    ) {
      commit(
        'SET_IS_SCROBBLED',
        value
      )
    },
    setIsWithScrobbleNotifications (
      {
        commit
      },
      value
    ) {
      commit(
        'SET_IS_WITH_SCROBBLE_NOTIFICATIONS',
        value
      )
    },
    setScrobblePercent (
      {
        commit
      },
      value
    ) {
      commit(
        'SET_SCROBBLE_PERCENT',
        value
      )
    },
    setIsScrobbling (
      {
        commit
      },
      value
    ) {
      commit(
        'SET_IS_SCROBBLING',
        value
      )
    }
  }
}

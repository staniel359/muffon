export default {
  namespaced: true,
  state: {
    playing: null,
    currentTrackId: null,
    currentVariantId: null,
    source: null,
    isWithBitrate: false,
    isWithDiscordRichPresence: false,
    isWithScrobbling: false,
    isWithScrobbleNotifications: false,
    scrobblePercent: 50,
    variants: [],
    isWithAlbum: false,
    fallbackSources: []
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
    SET_SOURCE (
      state,
      value
    ) {
      state.source = value
    },
    SET_IS_WITH_SCROBBLING (
      state,
      value
    ) {
      state.isWithScrobbling = value
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
    SET_IS_WITH_BITRATE (
      state,
      value
    ) {
      state.isWithBitrate = value
    },
    SET_IS_WITH_ALBUM (
      state,
      value
    ) {
      state.isWithAlbum = value
    },
    SET_FALLBACK_SOURCES (
      state,
      value
    ) {
      state.fallbackSources = value
    },
    SET_IS_WITH_DISCORD_RICH_PRESENCE (
      state,
      value
    ) {
      state.isWithDiscordRichPresence = value
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
    setIsWithBitrate (
      {
        commit
      },
      value
    ) {
      commit(
        'SET_IS_WITH_BITRATE',
        value
      )
    },
    setIsWithAlbum (
      {
        commit
      },
      value
    ) {
      commit(
        'SET_IS_WITH_ALBUM',
        value
      )
    },
    setFallbackSources (
      {
        commit
      },
      value
    ) {
      commit(
        'SET_FALLBACK_SOURCES',
        value
      )
    },
    setIsWithDiscordRichPresence (
      {
        commit
      },
      value
    ) {
      commit(
        'SET_IS_WITH_DISCORD_RICH_PRESENCE',
        value
      )
    }
  }
}

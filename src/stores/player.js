import {
  defineStore
} from 'pinia'

const data = {
  state () {
    return {
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
    }
  },
  getters: {
    variantsCount (
      state
    ) {
      return state.variants.length
    }
  },
  actions: {
    setVariants (
      value
    ) {
      this.variants = value
    },
    setPlaying (
      value
    ) {
      this.playing = value
    },
    setCurrentTrackId (
      value
    ) {
      this.currentTrackId = value
    },
    setCurrentVariantId (
      value
    ) {
      this.currentVariantId = value
    },
    setSource (
      value
    ) {
      this.source = value
    },
    setIsWithScrobbling (
      value
    ) {
      this.isWithScrobbling = value
    },
    setIsWithScrobbleNotifications (
      value
    ) {
      this.isWithScrobbleNotifications = value
    },
    setScrobblePercent (
      value
    ) {
      this.scrobblePercent = value
    },
    setIsWithBitrate (
      value
    ) {
      this.isWithBitrate = value
    },
    setIsWithAlbum (
      value
    ) {
      this.isWithAlbum = value
    },
    setFallbackSources (
      value
    ) {
      this.fallbackSources = value
    },
    setIsWithDiscordRichPresence (
      value
    ) {
      this.isWithDiscordRichPresence = value
    }
  }
}

export default defineStore(
  'player',
  data
)

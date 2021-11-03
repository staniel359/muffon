<template>
  <div id="the-store-observer"></div>
</template>

<script>
import { mapActions } from 'vuex'
import { ipcRenderer } from 'electron'
import i18n from '*/i18n'

export default {
  name: 'TheStoreObserver',
  mounted () {
    ipcRenderer.on(
      'handle-update-store',
      this.handleUpdateStore
    )
  },
  methods: {
    ...mapActions('audio', {
      setIsAudioAutoplay: 'setIsAutoplay',
      setAudioVolume: 'setVolume'
    }),
    ...mapActions('layout', [
      'setIsDarkMode'
    ]),
    ...mapActions('player', {
      setPlayerCurrentTrackId: 'setCurrentTrackId',
      setPlayerCurrentVariantId: 'setCurrentVariantId',
      setIsPlayerScrobbling: 'setIsScrobbling',
      setIsPlayerToScrobble: 'setIsToScrobble',
      setIsPlayerScrobbled: 'setIsScrobbled',
      setIsPlayerWithScrobbleNotifications: 'setIsWithScrobbleNotifications',
      setPlayerScrobblePercent: 'setScrobblePercent',
      setPlayerPlaying: 'setPlaying',
      setPlayerSourceId: 'setSourceId',
      setPlayerVariants: 'setVariants'
    }),
    ...mapActions('profile', {
      setProfileInfo: 'setInfo',
      setProfileToken: 'setToken',
      setIsProfileLoggedIn: 'setIsLoggedIn',
      setIsProfileRemember: 'setIsRemember',
      setProfileLanguage: 'setLanguage'
    }),
    ...mapActions('queue', {
      setQueueCurrentTrackId: 'setCurrentTrackId',
      setIsQueueAutoplay: 'setIsAutoplay',
      setIsQueueShuffle: 'setIsShuffle',
      setQueueTracks: 'setTracks',
      setQueueTracksShuffled: 'setTracksShuffled'
    }),
    handleUpdateStore (_, data) {
      const storeKeysValues = Object.entries(
        JSON.parse(data)
      )

      storeKeysValues.forEach(
        this.setStoreKeyValue
      )
    },
    setStoreKeyValue ([key, value]) {
      switch (key) {
        case 'audio.isAutoplay':
          return this.setIsAudioAutoplay(value)
        case 'audio.volume':
          return this.setAudioVolume(value)
        case 'layout.isDarkMode':
          return this.setIsDarkMode(value)
        case 'player.currentTrackId':
          return this.setPlayerCurrentTrackId(value)
        case 'player.currentVariantId':
          return this.setPlayerCurrentVariantId(value)
        case 'player.isScrobbling':
          return this.setIsPlayerScrobbling(value)
        case 'player.isToScrobble':
          return this.setIsPlayerToScrobble(value)
        case 'player.isScrobbled':
          return this.setIsPlayerScrobbled(value)
        case 'player.isWithScrobbleNotifications':
          return this.setIsPlayerWithScrobbleNotifications(value)
        case 'player.scrobblePercent':
          return this.setPlayerScrobblePercent(value)
        case 'player.playing':
          return this.setPlayerPlaying(value)
        case 'player.sourceId':
          return this.setPlayerSourceId(value)
        case 'player.variants':
          return this.setPlayerVariants(value)
        case 'profile.info':
          return this.setProfileInfo(value)
        case 'profile.token':
          return this.setProfileToken(value)
        case 'profile.isLoggedIn':
          return this.setIsProfileLoggedIn(value)
        case 'profile.isRemember':
          return this.setIsProfileRemember(value)
        case 'profile.language':
          i18n.global.locale = value

          return this.setProfileLanguage(value)
        case 'queue.currentTrackId':
          return this.setQueueCurrentTrackId(value)
        case 'queue.isAutoplay':
          return this.setIsQueueAutoplay(value)
        case 'queue.isShuffle':
          return this.setIsQueueShuffle(value)
        case 'queue.tracks':
          return this.setQueueTracks(value)
        case 'queue.tracksShuffled':
          return this.setQueueTracksShuffled(value)
        default:
          return null
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>

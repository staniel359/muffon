<template>
  <div id="the-store-observer"></div>
</template>

<script>
import { mapActions } from 'vuex'
import { ipcRenderer } from 'electron'

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
      setIsAudioAutoplay: 'setIsAutoplay'
    }),
    ...mapActions('layout', [
      'setIsDarkMode'
    ]),
    ...mapActions('player', {
      setPlayerCurrentTrackId: 'setCurrentTrackId',
      setPlayerCurrentVariantId: 'setCurrentVariantId',
      setPlayerPlaying: 'setPlaying',
      setPlayerSourceId: 'setSourceId',
      setPlayerVariants: 'setVariants'
    }),
    ...mapActions('profile', {
      setProfileInfo: 'setInfo',
      setIsProfileLoggedIn: 'setIsLoggedIn'
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
        case 'layout.isDarkMode':
          return this.setIsDarkMode(value)
        case 'player.currentTrackId':
          return this.setPlayerCurrentTrackId(value)
        case 'player.currentVariantId':
          return this.setPlayerCurrentVariantId(value)
        case 'player.playing':
          return this.setPlayerPlaying(value)
        case 'player.sourceId':
          return this.setPlayerSourceId(value)
        case 'player.variants':
          return this.setPlayerVariants(value)
        case 'profile.info':
          return this.setProfileInfo(value)
        case 'profile.isLoggedIn':
          return this.setIsProfileLoggedIn(value)
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

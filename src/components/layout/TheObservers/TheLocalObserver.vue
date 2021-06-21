<template>
  <div id="the-local-observer"></div>
</template>

<script>
import { mapActions } from 'vuex'
import { ipcRenderer } from 'electron'
import local from '#/plugins/local'

export default {
  name: 'TheLocalObserver',
  computed: {
    localKeysValues () {
      return Object.entries(local.store)
    }
  },
  mounted () {
    ipcRenderer.on(
      'set-tab-id',
      this.handleSetTabId
    )

    this.localKeysValues.forEach(
      this.setStoreKeyValue
    )
  },
  methods: {
    ...mapActions('layout', [
      'setIsDarkMode',
      'setTabId'
    ]),
    ...mapActions('player', {
      setPlayerCurrentTrackId: 'setCurrentTrackId',
      setPlayerCurrentVariantId: 'setCurrentVariantId',
      setPlayerPlaying: 'setPlaying',
      setPlayerSourceId: 'setSourceId',
      setPlayerVariants: 'setVariants'
    }),
    ...mapActions('queue', {
      setQueueCurrentTrackId: 'setCurrentTrackId',
      setIsQueueAutoplay: 'setIsAutoplay',
      setIsQueueShuffle: 'setIsShuffle',
      setQueueTracks: 'setTracks',
      setQueueTracksShuffled: 'setTracksShuffled'
    }),
    handleSetTabId (_, value) {
      this.setTabId(value)
    },
    setStoreKeyValue ([key, value]) {
      switch (key) {
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

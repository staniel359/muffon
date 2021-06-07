<template>
  <div class="the-store-observer"></div>
</template>

<script>
import { mapState } from 'vuex'
import {
  setIsDarkMode as setIsLocalDarkMode
} from '#/actions/plugins/local/layout'
import {
  setCurrentTrackId as setLocalPlayerCurrentTrackId,
  setCurrentVariantId as setLocalPlayerCurrentVariantId,
  setPlaying as setLocalPlayerPlaying,
  setSourceId as setLocalPlayerSourceId,
  setVariants as setLocalPlayerVariants
} from '#/actions/plugins/local/player'
import {
  setCurrentTrackId as setLocalQueueCurrentTrackId,
  setIsAutoplay as setIsLocalQueueAutoplay,
  setTracks as setLocalQueueTracks
} from '#/actions/plugins/local/queue'

export default {
  name: 'TheStoreObserver',
  computed: {
    ...mapState('layout', [
      'isDarkMode'
    ]),
    ...mapState('player', {
      playerPlaying: 'playing',
      playerCurrentTrackId: 'currentTrackId',
      playerCurrentVariantId: 'currentVariantId',
      playerVariants: 'variants',
      playerSourceId: 'sourceId'
    }),
    ...mapState('queue', {
      queueTracks: 'tracks',
      queueCurrentTrackId: 'currentTrackId',
      isQueueAutoplay: 'isAutoplay'
    })
  },
  watch: {
    isDarkMode: 'handleIsDarkModeChange',
    playerCurrentTrackId: 'handlePlayerCurrentTrackIdChange',
    playerCurrentVariantId: 'handlePlayerCurrentVariantIdChange',
    playerPlaying: 'handlePlayerPlayingChange',
    playerSourceId: 'handlePlayerSourceIdChange',
    playerVariants: 'handlePlayerVariantsChange',
    queueCurrentTrackId: 'handleQueueCurrentTrackIdChange',
    isQueueAutoplay: 'handleIsQueueAutoplayChange',
    queueTracks: 'handleQueueTracksChange'
  },
  methods: {
    handleIsDarkModeChange (value) {
      setIsLocalDarkMode(value)
    },
    handlePlayerCurrentTrackIdChange (value) {
      setLocalPlayerCurrentTrackId(value)
    },
    handlePlayerCurrentVariantIdChange (value) {
      setLocalPlayerCurrentVariantId(value)
    },
    handlePlayerPlayingChange (value) {
      setLocalPlayerPlaying(value)
    },
    handlePlayerSourceIdChange (value) {
      setLocalPlayerSourceId(value)
    },
    handlePlayerVariantsChange (value) {
      setLocalPlayerVariants(value)
    },
    handleQueueCurrentTrackIdChange (value) {
      setLocalQueueCurrentTrackId(value)
    },
    handleIsQueueAutoplayChange (value) {
      setIsLocalQueueAutoplay(value)
    },
    handleQueueTracksChange (value) {
      setLocalQueueTracks(value)
    }
  }
}
</script>

<style lang="sass" scoped></style>

<template>
  <div class="the-local-observer"></div>
</template>

<script>
import { mapState } from 'vuex'
import {
  setPlayerPlaying as setLocalPlayerPlaying,
  getPlayerPlaying as getLocalPlayerPlaying,
  setPlayerCurrentTrackId as setLocalPlayerCurrentTrackId,
  getPlayerCurrentTrackId as getLocalPlayerCurrentTrackId,
  setPlayerVariants as setLocalPlayerVariants,
  getPlayerVariants as getLocalPlayerVariants,
  setPlayerSourceId as setLocalPlayerSourceId,
  getPlayerSourceId as getLocalPlayerSourceId,
  setQueueTracks as setLocalQueueTracks,
  getQueueTracks as getLocalQueueTracks,
  setQueueCurrentTrackId as setLocalQueueCurrentTrackId,
  getQueueCurrentTrackId as getLocalQueueCurrentTrackId,
  setIsQueueAutoplay as setIsLocalQueueAutoplay,
  getIsQueueAutoplay as getIsLocalQueueAutoplay,
  setIsDarkMode as setIsLocalDarkMode,
  getIsDarkMode as getIsLocalDarkMode
} from '#/actions/plugins/local'
import {
  setPlaying as setPlayerPlaying,
  setCurrentTrackId as setPlayerCurrentTrackId,
  setVariants as setPlayerVariants,
  setSourceId as setPlayerSourceId
} from '#/actions/player'
import {
  setTracks as setQueueTracks,
  setCurrentTrackId as setQueueCurrentTrackId,
  setIsAutoplay as setIsQueueAutoplay
} from '#/actions/queue'
import { setIsDarkMode } from '#/actions/layout'

export default {
  name: 'TheLocalObserver',
  computed: {
    ...mapState('player', {
      playerPlaying: 'playing',
      playerCurrentTrackId: 'currentTrackId',
      playerVariants: 'variants',
      playerSourceId: 'sourceId'
    }),
    ...mapState('queue', {
      queueTracks: 'tracks',
      queueCurrentTrackId: 'currentTrackId',
      isQueueAutoplay: 'isAutoplay'
    }),
    ...mapState('layout', [
      'isDarkMode'
    ])
  },
  watch: {
    playerPlaying: 'handlePlayerPlayingChange',
    playerCurrentTrackId: 'handlePlayerCurrentTrackIdChange',
    playerVariants: 'handlePlayerVariantsChange',
    playerSourceId: 'handlePlayerSourceIdChange',
    queueTracks: 'handleQueueTracksChange',
    queueCurrentTrackId: 'handleQueueCurrentTrackIdChange',
    isQueueAutoplay: 'handleIsQueueAutoplayChange',
    isDarkMode: 'handleIsDarkModeChange'
  },
  mounted () {
    setPlayerPlaying(
      getLocalPlayerPlaying(),
      { isAutoplay: false }
    )
    setPlayerCurrentTrackId(
      getLocalPlayerCurrentTrackId()
    )
    setPlayerVariants(
      getLocalPlayerVariants()
    )
    setPlayerSourceId(
      getLocalPlayerSourceId()
    )
    setQueueTracks(
      getLocalQueueTracks()
    )
    setQueueCurrentTrackId(
      getLocalQueueCurrentTrackId()
    )
    setIsQueueAutoplay(
      getIsLocalQueueAutoplay()
    )
    setIsDarkMode(
      getIsLocalDarkMode()
    )
  },
  methods: {
    handlePlayerPlayingChange (value) {
      setLocalPlayerPlaying(value)
    },
    handlePlayerCurrentTrackIdChange (value) {
      setLocalPlayerCurrentTrackId(value)
    },
    handlePlayerVariantsChange (value) {
      setLocalPlayerVariants(value)
    },
    handlePlayerSourceIdChange (value) {
      setLocalPlayerSourceId(value)
    },
    handleQueueTracksChange (value) {
      setLocalQueueTracks(value)
    },
    handleQueueCurrentTrackIdChange (value) {
      setLocalQueueCurrentTrackId(value)
    },
    handleIsQueueAutoplayChange (value) {
      setIsLocalQueueAutoplay(value)
    },
    handleIsDarkModeChange (value) {
      setIsLocalDarkMode(value)
    }
  }
}
</script>

<style lang="sass" scoped></style>

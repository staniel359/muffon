<template>
  <div id="the-local-observer"></div>
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
  setQueueTracks as setLocalQueueTracks,
  getQueueTracks as getLocalQueueTracks,
  setQueueCurrentTrackId as setLocalQueueCurrentTrackId,
  getQueueCurrentTrackId as getLocalQueueCurrentTrackId,
  setIsQueueAutoplay as setLocalIsQueueAutoplay,
  getIsQueueAutoplay as getLocalIsQueueAutoplay
} from '#/actions/plugins/local'
import {
  setPlaying as setPlayerPlaying,
  setCurrentTrackId as setPlayerCurrentTrackId,
  setVariants as setPlayerVariants
} from '#/actions/player'
import {
  setTracks as setQueueTracks,
  setCurrentTrackId as setQueueCurrentTrackId,
  setIsAutoplay as setIsQueueAutoplay
} from '#/actions/queue'

export default {
  name: 'TheLocalObserver',
  computed: {
    ...mapState('player', {
      playerPlaying: 'playing',
      playerCurrentTrackId: 'currentTrackId',
      playerVariants: 'variants'
    }),
    ...mapState('queue', {
      queueTracks: 'tracks',
      queueCurrentTrackId: 'currentTrackId',
      isQueueAutoplay: 'isAutoplay'
    })
  },
  watch: {
    playerPlaying: 'handlePlayerPlayingChange',
    playerCurrentTrackId: 'handlePlayerCurrentTrackIdChange',
    playerVariants: 'handlePlayerVariantsChange',
    queueTracks: 'handleQueueTracksChange',
    queueCurrentTrackId: 'handleQueueCurrentTrackIdChange',
    isQueueAutoplay: 'handleIsQueueAutoplayChange'
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
    setQueueTracks(
      getLocalQueueTracks()
    )
    setQueueCurrentTrackId(
      getLocalQueueCurrentTrackId()
    )
    setIsQueueAutoplay(
      getLocalIsQueueAutoplay()
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
    handleQueueTracksChange (value) {
      setLocalQueueTracks(value)
    },
    handleQueueCurrentTrackIdChange (value) {
      setLocalQueueCurrentTrackId(value)
    },
    handleIsQueueAutoplayChange (value) {
      setLocalIsQueueAutoplay(value)
    }
  }
}
</script>

<style lang="sass" scoped></style>

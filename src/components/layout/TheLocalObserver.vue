<template>
  <template></template>
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
  getQueueCurrentTrackId as getLocalQueueCurrentTrackId
} from '#/actions/plugins/local'
import {
  setPlaying as setPlayerPlaying,
  setCurrentTrackId as setPlayerCurrentTrackId,
  setVariants as setPlayerVariants
} from '#/actions/player'
import {
  setTracks as setQueueTracks,
  setCurrentTrackId as setQueueCurrentTrackId
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
      queueCurrentTrackId: 'currentTrackId'
    })
  },
  watch: {
    playerPlaying: 'handlePlayerPlayingChange',
    playerCurrentTrackId: 'handlePlayerCurrentTrackIdChange',
    playerVariants: 'handlePlayerVariantsChange',
    queueTracks: 'handleQueueTracksChange',
    queueCurrentTrackId: 'handleQueueCurrentTrackIdChange'
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
    }
  }
}
</script>

<style lang="sass" scoped></style>

<template>
  <div id="the-media-observer"></div>
</template>

<script>
import getQueueTrack from '#/actions/queue/track/get'
import { updateStore } from '#/actions'

export default {
  name: 'TheMediaKeysObserver',
  mounted () {
    navigator
      .mediaSession
      .setActionHandler(
        'previoustrack',
        this.handlePressPrev
      )
    navigator
      .mediaSession
      .setActionHandler(
        'nexttrack',
        this.handlePressNext
      )
    navigator
      .mediaSession
      .setActionHandler(
        'stop',
        this.handlePressStop
      )
  },
  computed: {
    prevQueueTrackArgs () {
      return {
        position: 'prev'
      }
    },
    nextQueueTrackArgs () {
      return {
        position: 'prev'
      }
    }
  },
  methods: {
    handlePressPrev () {
      getQueueTrack(
        this.prevQueueTrackArgs
      )
    },
    handlePressNext () {
      getQueueTrack(
        this.nextQueueTrackArgs
      )
    },
    handlePressStop () {
      updateStore({
        'player.playing': null
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>

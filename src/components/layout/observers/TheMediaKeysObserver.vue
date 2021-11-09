<template>
  <div id="the-media-observer"></div>
</template>

<script>
import fetchQueueTrack from '#/actions/queue/track/fetchData'
import { updateStore } from '#/actions'

export default {
  name: 'TheMediaKeysObserver',
  mounted () {
    navigator.mediaSession.setActionHandler(
      'previoustrack', this.handlePressPrev
    )
    navigator.mediaSession.setActionHandler(
      'nexttrack', this.handlePressNext
    )
    navigator.mediaSession.setActionHandler(
      'stop', this.handlePressStop
    )
  },
  methods: {
    handlePressPrev () {
      fetchQueueTrack({
        position: 'prev'
      })
    },
    handlePressNext () {
      fetchQueueTrack({
        position: 'next'
      })
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

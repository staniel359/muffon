<template>
  <div class="the-media-observer"></div>
</template>

<script>
import { toggleAction as toggleAudioAction } from '#/actions/audio'
import fetchQueueTrack from '#/actions/queue/track/fetchData'
import { stopAndClose as stopAndClosePlayer } from '#/actions/player'

const { ipcRenderer } = require('electron')

export default {
  name: 'TheMediaKeysObserver',
  mounted () {
    ipcRenderer.on('press-media-play', this.handlePressPlay)
    ipcRenderer.on('press-media-prev', this.handlePressPrev)
    ipcRenderer.on('press-media-next', this.handlePressNext)
    ipcRenderer.on('press-media-stop', this.handlePressStop)
  },
  methods: {
    handlePressPlay () {
      toggleAudioAction()
    },
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
      stopAndClosePlayer()
    }
  }
}
</script>

<style lang="sass" scoped></style>

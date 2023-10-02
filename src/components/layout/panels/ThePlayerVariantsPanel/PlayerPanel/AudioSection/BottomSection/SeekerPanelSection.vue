<template>
  <SeekerPanel
    @audio-end="handleAudioEnd"
  />
</template>

<script>
import hotkeys from 'hotkeys-js'
import {
  mapState
} from 'pinia'
import queueStore from '@/stores/queue'
import playerStore from '@/stores/player'
import audioStore from '@/stores/audio'
import SeekerPanel from './SeekerPanelSection/SeekerPanel.vue'
import getQueueTrack from '@/helpers/actions/queue/track/get'

export default {
  name: 'SeekerPanelSection',
  components: {
    SeekerPanel
  },
  computed: {
    ...mapState(
      queueStore,
      {
        isQueueAutoplay: 'isAutoplay',
        isQueueEnd: 'isEnd'
      }
    ),
    ...mapState(
      playerStore,
      {
        playerPlaying: 'playing'
      }
    ),
    ...mapState(
      audioStore,
      {
        isAudioLoop: 'isLoop'
      }
    ),
    isGetQueueNextTrack () {
      return (
        this.isQueueAutoplay &&
          !this.isQueueEnd
      )
    },
    queueTrackArgs () {
      return {
        position: 'next'
      }
    },
    isGetRadioNextTrack () {
      return (
        this.isPlayingFromRadio &&
          !this.isAudioLoop
      )
    },
    isPlayingFromRadio () {
      return this.playerPlaying.from_radio
    }
  },
  methods: {
    getQueueTrack,
    handleAudioEnd () {
      if (this.isGetQueueNextTrack) {
        this.getQueueNextTrack()
      } else if (this.isGetRadioNextTrack) {
        this.getRadioNextTrack()
      }
    },
    getQueueNextTrack () {
      this.getQueueTrack(
        this.queueTrackArgs
      )
    },
    getRadioNextTrack () {
      hotkeys.trigger(
        'shift+right'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>

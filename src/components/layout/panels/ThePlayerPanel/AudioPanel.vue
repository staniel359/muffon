<template>
  <div class="audio-panel">
    <AudioElement />

    <div class="audio-top-section">
      <TimerPanel />

      <MainControlsPanel />

      <ExtraControlsPanel />
    </div>

    <div class="audio-bottom-section">
      <SeekerPanel
        @audio-end="handleAudioEnd"
      />
    </div>
  </div>
</template>

<script>
import {
  mapGetters,
  mapState
} from 'vuex'
import AudioElement from './AudioPanel/AudioElement.vue'
import TimerPanel from './AudioPanel/TimerPanel.vue'
import MainControlsPanel from './AudioPanel/MainControlsPanel.vue'
import ExtraControlsPanel from './AudioPanel/ExtraControlsPanel.vue'
import SeekerPanel from './AudioPanel/SeekerPanel.vue'
import getQueueTrack from '*/helpers/actions/queue/track/get'

export default {
  name: 'AudioPanel',
  components: {
    AudioElement,
    TimerPanel,
    MainControlsPanel,
    ExtraControlsPanel,
    SeekerPanel
  },
  computed: {
    ...mapState(
      'audio',
      {
        audioElement: 'element'
      }
    ),
    ...mapState(
      'queue',
      {
        isQueueAutoplay: 'isAutoplay'
      }
    ),
    ...mapGetters(
      'queue',
      {
        isQueueEnd: 'isEnd'
      }
    ),
    isPlayNext () {
      return (
        this.isQueueAutoplay &&
          !this.isQueueEnd
      )
    },
    queueTrackArgs () {
      return {
        position: 'next'
      }
    }
  },
  watch: {
    isQueueAutoplay: 'handleIsQueueAutoplayChange'
  },
  methods: {
    getQueueTrack,
    handleAudioEnd () {
      if (this.isPlayNext) {
        this.getQueueNextTrack()
      }
    },
    handleIsQueueAutoplayChange () {
      if (
        this.isPlayNext &&
          this.audioElement.ended
      ) {
        this.getQueueNextTrack()
      }
    },
    getQueueNextTrack () {
      this.getQueueTrack(
        this.queueTrackArgs
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.audio-panel
  @extend .flex-full, .d-flex, .flex-column, .align-items-center, .justify-content-center
  margin-left: 1em

.audio-top-section
  @extend .d-flex, .align-items-center, .w-100

.audio-bottom-section
  @extend .w-100
  margin-top: 0.5em
</style>

<template>
  <div class="audio-panel">
    <AudioElement />

    <div class="audio-top-section">
      <TimerPanel />
      <MainControlsPanel />
      <ExtraControlsPanel />
    </div>

    <SeekerPanel @audioEnd="handleAudioEnd" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AudioElement from './AudioPanel/AudioElement.vue'
import TimerPanel from './AudioPanel/TimerPanel.vue'
import MainControlsPanel from './AudioPanel/MainControlsPanel.vue'
import ExtraControlsPanel from './AudioPanel/ExtraControlsPanel.vue'
import SeekerPanel from './AudioPanel/SeekerPanel.vue'
import fetchQueueTrackData from '#/actions/queue/track/fetchData'

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
    ...mapGetters('queue', {
      isQueueEnd: 'isEnd'
    })
  },
  methods: {
    handleAudioEnd () {
      if (!this.isQueueEnd) {
        this.fetchQueueNextTrack()
      }
    },
    fetchQueueTrackData,
    fetchQueueNextTrack () {
      this.fetchQueueTrackData({
        position: 'next'
      })
    }
  }
}
</script>

<style lang="sass" scoped>
.audio-panel
  @extend .flex-full, .d-flex, .flex-column, .align-items-center, .justify-content-center
  padding: 0 0.5em

.audio-top-section
  @extend .d-flex, .align-items-center, .w-100
  margin-bottom: 5px
</style>

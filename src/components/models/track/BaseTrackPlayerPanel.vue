<template>
  <div
    class="track-player-panel"
    :class="{
      inverted: isDarkMode
    }"
  >
    <PlayButtonSection
      :track-data="trackData"
    />

    <VisualizerSection
      :track-id="trackId"
    />

    <BaseDurationBlock
      v-if="duration"
      class="track-section track-duration"
      :duration="duration"
    />

    <AudioIconSection
      v-if="isAudioPresent"
    />
  </div>
</template>

<script>
import {
  mapState
} from 'vuex'
import PlayButtonSection from './BaseTrackPlayerPanel/PlayButtonSection.vue'
import VisualizerSection from './BaseTrackPlayerPanel/VisualizerSection.vue'
import BaseDurationBlock from '*/components/BaseDurationBlock.vue'
import AudioIconSection from './BaseTrackPlayerPanel/AudioIconSection.vue'

export default {
  name: 'BaseTrackPlayerPanel',
  components: {
    PlayButtonSection,
    VisualizerSection,
    BaseDurationBlock,
    AudioIconSection
  },
  props: {
    trackData: Object
  },
  computed: {
    ...mapState(
      'layout',
      [
        'isDarkMode'
      ]
    ),
    trackId () {
      return this.trackData.player_id
    },
    duration () {
      return this.trackData.duration_seconds
    },
    isAudioPresent () {
      return !!this.trackData.audio?.present
    }
  }
}
</script>

<style lang="sass" scoped>
.track-player-panel
  @extend .d-flex
  height: $trackPagePlayerPanelHeight
  ::v-deep(.track-section)
    border-left: $border
  &.inverted
    ::v-deep(.track-section)
      border-left: $borderInverted !important

.track-duration
  @extend .d-flex, .align-items-center
  padding: 0 1em
</style>

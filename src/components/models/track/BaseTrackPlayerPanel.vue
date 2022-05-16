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

    <DurationSection
      v-if="isRenderDuration"
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
import DurationSection from './BaseTrackPlayerPanel/DurationSection.vue'
import AudioIconSection from './BaseTrackPlayerPanel/AudioIconSection.vue'

export default {
  name: 'BaseTrackPlayerPanel',
  components: {
    PlayButtonSection,
    VisualizerSection,
    DurationSection,
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
    isRenderDuration () {
      return (
        this.duration &&
          this.duration !== '00:00'
      )
    },
    duration () {
      return this.trackData.duration
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
</style>

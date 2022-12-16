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

    <BaseDurationSection
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
} from 'pinia'
import layoutStore from '@/stores/layout'
import PlayButtonSection from './BaseTrackPlayerPanel/PlayButtonSection.vue'
import VisualizerSection from './BaseTrackPlayerPanel/VisualizerSection.vue'
import BaseDurationSection from '@/components/sections/BaseDurationSection.vue'
import AudioIconSection from './BaseTrackPlayerPanel/AudioIconSection.vue'

export default {
  name: 'BaseTrackPlayerPanel',
  components: {
    PlayButtonSection,
    VisualizerSection,
    BaseDurationSection,
    AudioIconSection
  },
  props: {
    trackData: Object
  },
  computed: {
    ...mapState(
      layoutStore,
      [
        'isDarkMode'
      ]
    ),
    trackId () {
      return this.trackData.player_id
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

.track-duration
  @extend .d-flex, .align-items-center
  padding: 0 1em
</style>

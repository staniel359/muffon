<template>
  <div
    class="track-player-panel"
    :class="{ inverted: isDarkMode }"
  >
    <PlayButtonSection :trackData="trackData" />
    <VisualizerSection :trackId="trackId" />

    <DurationSection
      v-if="isRenderDuration"
      :duration="duration"
    />

    <SourceSection
      v-if="isAudioPresent"
      :sourceId="sourceId"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import PlayButtonSection from './TrackPlayerPanel/PlayButtonSection.vue'
import VisualizerSection from './TrackPlayerPanel/VisualizerSection.vue'
import DurationSection from './TrackPlayerPanel/DurationSection.vue'
import SourceSection from './TrackPlayerPanel/SourceSection.vue'

export default {
  name: 'TrackPlayerPanel',
  components: {
    PlayButtonSection,
    VisualizerSection,
    DurationSection,
    SourceSection
  },
  props: {
    trackData: Object
  },
  computed: {
    ...mapState('layout', [
      'isDarkMode'
    ]),
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
    },
    sourceId () {
      return this.trackData.audio.source_id
    }
  }
}
</script>

<style lang="sass" scoped>
.track-player-panel
  @extend .d-flex
  height: $trackPagePlayerPanelHeight
  ::v-deep(.track-visualiser-container)
    border-left: $border
  ::v-deep(.track-duration)
    border-left: $border
  ::v-deep(.track-source)
    border-left: $border
  &.inverted
    border-top: $borderInverted
    ::v-deep(.track-visualiser-container)
      border-left: $borderInverted !important
    ::v-deep(.track-duration)
      border-left: $borderInverted !important
    ::v-deep(.track-source)
      border-left: $borderInverted !important
</style>

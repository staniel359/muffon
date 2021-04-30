<template>
  <div
    class="track-player-panel"
    :class="{ inverted: isDarkMode }"
  >
    <PlayButtonSection :trackData="trackData" />
    <VisualizerSection :trackId="trackId" />
    <LengthSection
      v-if="length"
      :length="length"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import PlayButtonSection from './TrackPlayerPanel/PlayButtonSection.vue'
import VisualizerSection from './TrackPlayerPanel/VisualizerSection.vue'
import LengthSection from './TrackPlayerPanel/LengthSection.vue'

export default {
  name: 'TrackPlayerPanel',
  components: {
    PlayButtonSection,
    VisualizerSection,
    LengthSection
  },
  props: {
    trackData: Object
  },
  computed: {
    ...mapState('layout', [
      'isDarkMode'
    ]),
    trackId () {
      return this.trackData.id
    },
    length () {
      return this.trackData.length
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
  ::v-deep(.track-length)
    border-left: $border
  &.inverted
    border-top: $borderInverted
    ::v-deep(.track-visualiser-container)
      border-left: $borderInverted !important
    ::v-deep(.track-length)
      border-left: $borderInverted !important
</style>

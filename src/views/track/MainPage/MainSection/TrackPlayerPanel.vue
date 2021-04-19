<template>
  <div class="track-player-panel">
    <PlayButtonSection :trackData="trackData"/>

    <VisualizerSection :trackId="trackId" />

    <LengthSection
      v-if="length"
      :length="length"
    />
  </div>
</template>

<script>
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
  height: 40px
  border-top: $border
</style>

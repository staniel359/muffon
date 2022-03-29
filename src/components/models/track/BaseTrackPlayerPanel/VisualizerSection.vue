<template>
  <div class="track-visualiser-container">
    <BaseAudioVisualiser
      v-if="isCurrent"
      class="track-visualiser"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BaseAudioVisualiser from '*/components/BaseAudioVisualiser.vue'

export default {
  name: 'VisualizerSection',
  components: {
    BaseAudioVisualiser
  },
  props: {
    trackId: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState('player', {
      playerCurrentTrackId: 'currentTrackId'
    }),
    isCurrent () {
      return (
        this.trackId ===
          this.playerCurrentTrackId
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.track-visualiser-container
  @extend .flex-full

.track-visualiser
  @extend .w-100, .h-100
</style>

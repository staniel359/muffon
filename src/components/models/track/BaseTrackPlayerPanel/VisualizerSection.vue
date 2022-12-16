<template>
  <div class="track-section">
    <BaseAudioVisualiser
      v-if="isCurrent"
      class="track-visualiser"
    />
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import playerStore from '@/stores/player'
import BaseAudioVisualiser from '@/components/BaseAudioVisualiser.vue'

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
    ...mapState(
      playerStore,
      {
        playerCurrentTrackId: 'currentTrackId'
      }
    ),
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
.track-section
  @extend .flex-full

.track-visualiser
  @extend .w-100, .h-100
</style>

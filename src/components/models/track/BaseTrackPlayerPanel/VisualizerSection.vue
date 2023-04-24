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
import BaseAudioVisualiser from '@/components/audio/BaseAudioVisualiser.vue'

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
        playerPlaying: 'playing'
      }
    ),
    isCurrent () {
      return (
        this.trackId ===
          this.currentTrackId
      )
    },
    currentTrackId () {
      return this.playerPlaying?.player_id
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

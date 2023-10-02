<template>
  <div class="track-section flex-full">
    <BaseAudioVisualiser
      v-if="isCurrent"
      class="width-100 height-100"
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

<style lang="sass" scoped></style>

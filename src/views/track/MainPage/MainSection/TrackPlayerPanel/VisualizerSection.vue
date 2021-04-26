<template>
  <div class="track-visualiser-container">
    <BaseAudioVisualiser
      v-if="isCurrent"
      class="track-visualiser"
    />
  </div>
</template>

<script>
import BaseAudioVisualiser from '@/BaseAudioVisualiser.vue'
import { getIsCurrentTrack as getIsPlayerCurrentTrack } from '#/actions/player'

export default {
  name: 'VisualizerSection',
  components: {
    BaseAudioVisualiser
  },
  props: {
    trackId: {
      type: Number,
      required: true
    }
  },
  computed: {
    isCurrent () {
      return getIsPlayerCurrentTrack({
        trackId: this.trackId
      })
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

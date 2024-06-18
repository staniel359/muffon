<template>
  <BaseSegmentContainer
    class="placeholder-segment section-segment"
    :class="{
      'height-player-panel': playerPlaying
    }"
  />
</template>

<script>
import {
  mapState
} from 'pinia'
import playerStore from '@/stores/player'
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'

export default {
  name: 'PlaceholderSection',
  components: {
    BaseSegmentContainer
  },
  computed: {
    ...mapState(
      playerStore,
      {
        playerPlaying: 'playing'
      }
    )
  }
}
</script>

<style lang="sass" scoped></style>

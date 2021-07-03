<template>
  <div class="track-panel">
    <BaseListContainer class="track-container">
      <TrackBlock v-if="playerPlaying" />
    </BaseListContainer>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BaseListContainer from '@/containers/BaseListContainer.vue'
import TrackBlock from './TrackPanel/TrackBlock.vue'

export default {
  name: 'TrackPanel',
  components: {
    BaseListContainer,
    TrackBlock
  },
  computed: {
    ...mapState('player', {
      playerPlaying: 'playing'
    })
  }
}
</script>

<style lang="sass" scoped>
.track-panel
  @extend .d-flex, .align-items-center
  width: 240px
  padding: 0 0.5em

.track-container
  @extend .w-100
</style>

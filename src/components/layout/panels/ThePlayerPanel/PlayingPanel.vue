<template>
  <div class="track-panel">
    <BaseListContainer class="track-container">
      <PlayingBlock v-if="playerPlaying" />
    </BaseListContainer>
  </div>
</template>

<script>
import {
  mapState
} from 'vuex'
import BaseListContainer
  from '*/components/containers/lists/BaseListContainer.vue'
import PlayingBlock from './PlayingPanel/PlayingBlock.vue'

export default {
  name: 'PlayingPanel',
  components: {
    BaseListContainer,
    PlayingBlock
  },
  computed: {
    ...mapState(
      'player',
      {
        playerPlaying: 'playing'
      }
    )
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

<template>
  <BaseSegmentContainer
    v-if="isPlayingFromRadio"
    is-inverted
  >
    <div class="playing-segment">
      <InfoBlock
        :track-data="playerPlaying"
      />

      <ImageBlock
        :track-data="playerPlaying"
      />
    </div>
  </BaseSegmentContainer>
</template>

<script>
import {
  mapState
} from 'pinia'
import playerStore from '@/stores/player'
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import InfoBlock from './PlayingSegment/InfoBlock.vue'
import ImageBlock from './PlayingSegment/ImageBlock.vue'

export default {
  name: 'PlayingSegment',
  components: {
    BaseSegmentContainer,
    InfoBlock,
    ImageBlock
  },
  computed: {
    ...mapState(
      playerStore,
      {
        playerPlaying: 'playing'
      }
    ),
    isPlayingFromRadio () {
      return this.playerPlaying?.from_radio
    }
  }
}
</script>

<style lang="sass" scoped>
.playing-segment
  @extend .relative, .overflow-hidden, .border-inverted, .border-radius
</style>

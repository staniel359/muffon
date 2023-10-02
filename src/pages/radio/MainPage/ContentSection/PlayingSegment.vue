<template>
  <BaseSegmentContainer
    v-if="isPlayingFromRadio"
  >
    <div class="relative overflow-hidden border-inverted border-radius-large">
      <ImageBlock
        :track-data="playerPlaying"
      />

      <InfoBlock
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
import ImageBlock from './PlayingSegment/ImageBlock.vue'
import InfoBlock from './PlayingSegment/InfoBlock.vue'

export default {
  name: 'PlayingSegment',
  components: {
    BaseSegmentContainer,
    ImageBlock,
    InfoBlock
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

<style lang="sass" scoped></style>

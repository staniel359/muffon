<template>
  <div
    class="center-aligned width-60"
    dir="ltr"
  >
    <div class="main-small-buttons-container middle-aligned">
      <EqualizerButton
        v-if="isPlayerWithEqualizer"
      />

      <LoopButton />

      <BaseQueueDirectionButtonContainer
        position="previous"
        :icon="leftButtonIcon"
      />

      <PlayButton />

      <BaseQueueDirectionButtonContainer
        position="next"
        :icon="rightButtonIcon"
      />

      <VolumeButton />
    </div>
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import layoutStore from '@/stores/layout'
import playerStore from '@/stores/player'
import EqualizerButton from './CenterControlsSection/EqualizerButton.vue'
import LoopButton from './CenterControlsSection/LoopButton.vue'
import BaseQueueDirectionButtonContainer
  from '@/components/containers/BaseQueueDirectionButtonContainer.vue'
import PlayButton from './CenterControlsSection/PlayButton.vue'
import VolumeButton from './CenterControlsSection/VolumeButton.vue'

export default {
  name: 'CenterControlsSection',
  components: {
    EqualizerButton,
    LoopButton,
    BaseQueueDirectionButtonContainer,
    PlayButton,
    VolumeButton
  },
  computed: {
    ...mapState(
      layoutStore,
      [
        'isRtl'
      ]
    ),
    ...mapState(
      playerStore,
      {
        isPlayerWithEqualizer: 'isWithEqualizer'
      }
    ),
    leftButtonIcon () {
      return (
        this.isRtl ? 'audioNext' : 'audioPrevious'
      )
    },
    rightButtonIcon () {
      return (
        this.isRtl ? 'audioPrevious' : 'audioNext'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>

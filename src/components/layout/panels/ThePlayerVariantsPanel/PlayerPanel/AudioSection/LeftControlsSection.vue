<template>
  <div class="left-controls-section">
    <TimerSection />

    <EqualizerButton
      v-if="isPlayerWithEqualizer"
    />
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import playerStore from '@/stores/player'
import TimerSection from './LeftControlsSection/TimerSection.vue'
import EqualizerButton from './LeftControlsSection/EqualizerButton.vue'

export default {
  name: 'LeftControlsSection',
  components: {
    TimerSection,
    EqualizerButton
  },
  computed: {
    ...mapState(
      playerStore,
      {
        isPlayerWithEqualizer: 'isWithEqualizer'
      }
    )
  }
}
</script>

<style lang="sass" scoped>
.left-controls-section
  @extend .d-flex, .align-items-center, .justify-content-space-between
  flex: 0.3
</style>

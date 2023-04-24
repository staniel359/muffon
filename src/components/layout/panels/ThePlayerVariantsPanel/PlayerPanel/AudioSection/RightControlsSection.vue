<template>
  <div class="right-controls-section">
    <BitrateSection
      v-if="isPlayerWithBitrate"
    />

    <OptionsSection />
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import playerStore from '@/stores/player'
import BitrateSection from './RightControlsSection/BitrateSection.vue'
import OptionsSection from './RightControlsSection/OptionsSection.vue'

export default {
  name: 'RightControlsSection',
  components: {
    BitrateSection,
    OptionsSection
  },
  computed: {
    ...mapState(
      playerStore,
      {
        isPlayerWithBitrate: 'isWithBitrate'
      }
    )
  }
}
</script>

<style lang="sass" scoped>
.right-controls-section
  @extend .d-flex, .align-items-center, .justify-content-flex-end
  flex: 0.3
</style>

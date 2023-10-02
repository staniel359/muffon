<template>
  <div class="width-25 middle-end-aligned">
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

<style lang="sass" scoped></style>

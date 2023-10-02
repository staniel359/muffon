<template>
  <div class="middle-aligned width-20">
    <BitrateSection
      v-if="isPlayerWithBitrate"
    />
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import playerStore from '@/stores/player'
import BitrateSection from './LeftControlsSection/BitrateSection.vue'

export default {
  name: 'LeftControlsSection',
  components: {
    BitrateSection
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

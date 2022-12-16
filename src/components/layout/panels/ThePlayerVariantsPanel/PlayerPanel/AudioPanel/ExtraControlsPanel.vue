<template>
  <div class="extra-controls-panel">
    <BitrateBlock
      v-if="isPlayerWithBitrate"
    />

    <OptionsBlock />
  </div>
</template>

<script>
import {
  mapState
} from 'pinia'
import playerStore from '@/stores/player'
import BitrateBlock from './ExtraControlsPanel/BitrateBlock.vue'
import OptionsBlock from './ExtraControlsPanel/OptionsBlock.vue'

export default {
  name: 'ExtraControlsPanel',
  components: {
    BitrateBlock,
    OptionsBlock
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
.extra-controls-panel
  @extend .d-flex, .align-items-center, .justify-content-flex-end
  flex: 0.3
</style>

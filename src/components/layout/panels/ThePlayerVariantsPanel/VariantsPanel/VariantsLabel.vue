<template>
  <BaseLabel
    class="basic top attached blurred variants-label middle-center-aligned width-fit-content pointer-events-auto cursor-pointer border-radius-no-bottom"
    :right-icon="icon"
    :text="variantsText"
  />
</template>

<script>
import {
  mapState
} from 'pinia'
import playerStore from '@/stores/player'
import BaseLabel from '@/components/labels/BaseLabel.vue'

export default {
  name: 'VariantsLabel',
  components: {
    BaseLabel
  },
  props: {
    isPanelVisible: Boolean
  },
  computed: {
    ...mapState(
      playerStore,
      {
        playerVariantsCount: 'variantsCount'
      }
    ),
    variantsText () {
      return this.$t(
        'player.variants',
        {
          count:
            this.playerVariantsCount
        }
      )
    },
    icon () {
      if (this.isPanelVisible) {
        return 'directionDown'
      } else {
        return 'directionUp'
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>

<template>
  <BaseLabel
    class="basic top attached variants-label"
    :icon="icon"
    :text="variantsText"
    is-reverse
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
          count: this.playerVariantsCount
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

<style lang="sass" scoped>
.variants-label
  @extend .d-flex, .align-items-center, .justify-content-center, .width-fit-content, .pointer-events-auto
  padding: 0.5em 1.5em !important
  left: 30px !important
  height: 30px
  border-bottom: 0 !important
  border-top-left-radius: $borderRadiusMedium !important
  border-top-right-radius: $borderRadiusMedium !important
  &.inverted
    @extend .border-inverted
    border-bottom: 0 !important
</style>

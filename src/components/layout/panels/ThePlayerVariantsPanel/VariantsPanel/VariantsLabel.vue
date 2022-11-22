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
  mapGetters
} from 'vuex'
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
    ...mapGetters(
      'player',
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
      return `chevron ${this.iconDirection}`
    },
    iconDirection () {
      return this.isPanelVisible ? 'down' : 'up'
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
    border: $borderInverted !important
    border-bottom: 0 !important
</style>

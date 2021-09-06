<template>
  <BaseLabel
    class="top attached right icon variants-label"
    :icon="iconFormatted"
    :text="variantsCountFormatted"
    isReverse
  />
</template>

<script>
import { mapGetters } from 'vuex'
import BaseLabel from '@/BaseLabel.vue'

export default {
  name: 'VariantsLabel',
  components: {
    BaseLabel
  },
  props: {
    isPanelVisible: Boolean
  },
  computed: {
    ...mapGetters('player', {
      playerVariantsCount: 'variantsCount'
    }),
    variantsCountFormatted () {
      return this.$t(
        'layout.player.variants',
        { number: this.playerVariantsCount }
      )
    },
    iconFormatted () {
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
  min-width: 120px
  left: 30px !important
  height: 30px
  border-bottom: 0 !important
  &.inverted
    border: $borderInverted !important
    border-bottom: 0 !important
</style>

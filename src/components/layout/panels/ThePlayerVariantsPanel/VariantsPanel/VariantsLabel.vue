<template>
  <BaseLabel
    class="basic top attached blurred variants-label middle-center-aligned width-fit-content pointer-events-auto no-margin cursor-pointer no-border-bottom"
    :class="transparentClass"
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
import transparencyMixin from '@/mixins/transparencyMixin'

export default {
  name: 'VariantsLabel',
  components: {
    BaseLabel
  },
  mixins: [
    transparencyMixin
  ],
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
@import '@/assets/styles/Shared.sass'

.variants-label
  padding: 0 1.5rem !important
  height: 35px
  border-top-left-radius: $borderRadius !important
  border-top-right-radius: $borderRadius !important
  top: -5px !important
  &.inverted
    @extend .border-inverted, .no-border-bottom
[dir="ltr"]
  .variants-label
    left: 30px !important
[dir="rtl"]
  .variants-label
    right: 30px !important
</style>

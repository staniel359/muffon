<template>
  <i
    class="no-padding min-width-unset"
    :class="[
      {
        flag: isFlag,
        icon: !isFlag,
        red: (
          isError && isIconRed
        ),
        'horizontally flipped': (
          isWithRtl && isRtl
        )
      },
      iconConditional
    ]"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @click="handleClick"
  >
    <div
      v-if="isLoading"
      class="ui mini active inline loader loading-icon"
    />
  </i>
</template>

<script>
import {
  mapState
} from 'pinia'
import layoutStore from '@/stores/layout'
import icons from '@/helpers/data/icons'

export default {
  name: 'BaseIcon',
  props: {
    isFlag: Boolean,
    isLoading: Boolean,
    isError: Boolean,
    icon: String,
    isIconRed: Boolean,
    isWithRtl: Boolean
  },
  emits: [
    'activeChange',
    'click'
  ],
  computed: {
    ...mapState(
      layoutStore,
      [
        'isRtl'
      ]
    ),
    iconConditional () {
      if (this.isLoading) {
        return null
      } else if (this.isError) {
        return icons.error
      } else {
        return this.iconFormatted
      }
    },
    iconFormatted () {
      return icons[
        this.icon
      ] || this.icon
    }
  },
  methods: {
    handleMouseEnter () {
      this.$emit(
        'activeChange',
        true
      )
    },
    handleMouseLeave () {
      this.$emit(
        'activeChange',
        false
      )
    },
    handleClick (
      event
    ) {
      this.$emit(
        'click',
        event
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.loading-icon
  z-index: 10
</style>

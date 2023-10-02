<template>
  <div
    class="base-counter-bar main-left-small-section background-grey"
    :class="{
      inverted: isDarkMode
    }"
    :style="{
      width: counterBarWidthFormatted
    }"
  />
</template>

<script>
import {
  mapState
} from 'pinia'
import layoutStore from '@/stores/layout'

export default {
  name: 'BaseCounterBar',
  props: {
    count: {
      type: Number,
      required: true
    },
    topCount: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      widthMaxPercent: 70
    }
  },
  computed: {
    ...mapState(
      layoutStore,
      [
        'isDarkMode'
      ]
    ),
    counterBarWidthFormatted () {
      return `${this.counterBarWidth}%`
    },
    counterBarWidth () {
      return (
        this.count /
          this.topCount *
          this.widthMaxPercent
      )
    }
  }
}
</script>

<style lang="sass" scoped>
@import '@/assets/styles/Shared.sass'

.base-counter-bar
  height: 4px
  border-radius: 2px
  &.inverted
    @extend .background-grey-inverted
</style>

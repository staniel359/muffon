<template>
  <div
    class="base-counter-bar main-left-mini-section background-grey"
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
      widthMaxPercent: 65
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

<style lang="sass" scoped></style>

<template>
  <svg
    class="base-percent-circle"
    :viewBox="viewBox"
  >
    <path
      class="background"
      :class="{
        inverted: isDarkMode
      }"
      :d="pathData"
      :stroke-width="width"
    />

    <path
      class="main"
      :d="pathData"
      :stroke-width="width"
      :stroke-dasharray="mainPathStrokeDashArray"
    />

    <text
      x="20"
      y="25"
      :class="{
        inverted: isDarkMode
      }"
      v-text="percent"
    />
  </svg>
</template>

<script>
import {
  mapState
} from 'pinia'
import layoutStore from '@/stores/layout'

export default {
  name: 'BasePercentCircle',
  props: {
    side: {
      type: Number,
      required: true
    },
    width: {
      type: Number,
      required: true
    },
    percent: {
      type: Number,
      required: true
    }
  },
  computed: {
    ...mapState(
      layoutStore,
      [
        'isDarkMode'
      ]
    ),
    viewBox () {
      return `0 0 ${this.side} ${this.side}`
    },
    pathData () {
      return [
        `M ${this.side / 2} ${this.width}`,
        `a ${this.radius} ${this.radius}`,
        `0 0 1 0 ${this.radius * 2}`,
        `a ${this.radius} ${this.radius}`,
        `0 0 1 0 ${this.radius * -2}`
      ].join(
        ' '
      )
    },
    radius () {
      return (
        this.side / 2 -
          this.width
      )
    },
    mainPathStrokeDashArray () {
      return `${this.percent * 1.035}, 200`
    }
  }
}
</script>

<style lang="sass" scoped></style>

<template>
  <div ref="transition">
    <slot></slot>
  </div>
</template>

<script>
import {
  setVisibility,
  setTransition,
  toggleTransition
} from '#/actions/plugins/semantic'
import { mainTransitionOptions } from '#/data/plugins/semantic'

export default {
  name: 'BaseTransitionContainer',
  props: {
    scrollable: {
      type: HTMLDivElement,
      required: true
    }
  },
  computed: {
    visibilityOptions () {
      return {
        once: false,
        onTopPassed: this.handleTopPass,
        onTopPassedReverse: this.handleTopPass
      }
    }
  },
  mounted () {
    setVisibility(
      this.scrollable,
      this.visibilityOptions
    )

    setTransition(
      this.$refs.transition,
      mainTransitionOptions()
    )
  },
  methods: {
    handleTopPass () {
      toggleTransition(
        this.$refs.transition,
        mainTransitionOptions()
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.hidden.transition
  @extend .d-block
</style>

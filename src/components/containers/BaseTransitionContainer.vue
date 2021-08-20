<template>
  <div ref="transition">
    <slot></slot>
  </div>
</template>

<script>
import {
  setVisibility,
  showTransition,
  hideTransition
} from '#/actions/plugins/semantic'

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
        onTopPassedReverse: this.handleTopReversePass
      }
    }
  },
  mounted () {
    setVisibility(
      this.scrollable,
      this.visibilityOptions
    )
  },
  methods: {
    handleTopPass () {
      this.$nextTick(() => {
        showTransition(
          this.$refs.transition
        )
      })
    },
    handleTopReversePass () {
      this.$nextTick(() => {
        hideTransition(
          this.$refs.transition
        )
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>

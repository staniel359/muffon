<template>
  <div ref="transition">
    <slot />
  </div>
</template>

<script>
import {
  setVisibility,
  showTransition,
  hideTransition
} from '*/helpers/actions/plugins/semantic'

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
    async handleTopPass () {
      await this.$nextTick()

      showTransition(
        this.$refs.transition
      )
    },
    async handleTopReversePass () {
      await this.$nextTick()

      hideTransition(
        this.$refs.transition
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>

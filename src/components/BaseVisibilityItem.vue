<template>
  <div ref="visibility"></div>
</template>

<script>
import { setVisibility } from '#/actions/plugins/semantic'

export default {
  name: 'BaseVisibilityItem',
  props: {
    scrollable: HTMLDivElement
  },
  emits: [
    'init',
    'visible'
  ],
  computed: {
    visibilityOptions () {
      return {
        onOnScreen: this.handleIsOnScreen,
        context: this.scrollable
      }
    }
  },
  mounted () {
    setVisibility(
      this.$refs.visibility,
      this.visibilityOptions
    )

    this.$emit('init', this.$refs.visibility)
  },
  methods: {
    handleIsOnScreen () {
      this.$emit('visible')
    }
  }
}
</script>

<style lang="sass" scoped></style>

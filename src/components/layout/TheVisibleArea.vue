<template>
  <div class="the-visible-area-container">
    <div
      ref="visible"
      class="the-visible-area"
    />
  </div>
</template>

<script>
import {
  mapActions
} from 'vuex'

export default {
  name: 'TheVisibleArea',
  mounted () {
    this.setVisibleContext(
      this.$refs.visible
    )
  },
  methods: {
    ...mapActions(
      'layout',
      [
        'setVisibleContext'
      ]
    )
  }
}
</script>

<style lang="sass" scoped>
.the-visible-area-container
  @extend .w-100, .fixed, .pointer-events-none
  height: calc(100vh - #{$navbarHeight} - #{$playerPanelHeight})
  top: $navbarHeight
  z-index: 10000

.the-visible-area
  @extend .w-100, .h-100, .relative
</style>

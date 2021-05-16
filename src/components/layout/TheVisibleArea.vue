<template>
  <div
    class="the-visible-area"
    ref="visible"
  ></div>
</template>

<script>
import { setDropdownContext } from '#/actions/layout'

export default {
  name: 'TheVisibleArea',
  mounted () {
    setDropdownContext(
      this.$refs.visible
    )
  }
}
</script>

<style lang="sass" scoped>
.the-visible-area
  @extend .w-100, .fixed
  height: calc(100vh - #{$navbarHeight} - #{$playerPanelHeight})
  top: $navbarHeight
</style>

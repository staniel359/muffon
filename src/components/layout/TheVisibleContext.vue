<template>
  <div
    class="the-visible-context"
    ref="visible"
  ></div>
</template>

<script>
import { setDropdownContext } from '#/actions/layout'

export default {
  name: 'TheVisibleContext',
  mounted () {
    setDropdownContext(
      this.$refs.visible
    )
  }
}
</script>

<style lang="sass" scoped>
.the-visible-context
  @extend .w-100, .fixed
  height: calc(100vh - #{$navbarHeight} - #{$playerPanelHeight})
  top: $navbarHeight
</style>

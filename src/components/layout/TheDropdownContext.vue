<template>
  <div
    id="the-dropdown-context"
    ref="dropdownContext"
  ></div>
</template>

<script>
import { setDropdownContext } from '#/actions/layout'

export default {
  name: 'TheDropdownContext',
  mounted () {
    setDropdownContext(
      this.$refs.dropdownContext
    )
  }
}
</script>

<style lang="sass" scoped>
#the-dropdown-context
  @extend .w-100, .fixed
  height: calc(100vh - #{$navbarHeight} - #{$playerPanelHeight})
  top: $navbarHeight
</style>

<template>
  <div
    class="ui circular tiny basic compact icon button close-button"
    :class="{ red: isHovered }"
    @click="handleClick"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <i class="close icon" />
  </div>
</template>

<script>
import { stopAndClose as stopAndClosePlayer } from '#/actions/player'

export default {
  name: 'CloseButton',
  data () {
    return {
      isHovered: false
    }
  },
  methods: {
    handleClick () {
      stopAndClosePlayer()
    },
    handleMouseEnter () {
      this.isHovered = true
    },
    handleMouseLeave () {
      this.isHovered = false
    }
  }
}
</script>

<style lang="sass" scoped>
.close-button
  @extend .no-shadow, .no-margin
  margin-left: 0.5em !important
</style>

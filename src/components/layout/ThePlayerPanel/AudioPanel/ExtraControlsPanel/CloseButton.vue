<template>
  <div
    class="ui circular tiny basic compact icon button close-button"
    ref="button"
    :data-content="popupTextFormatted"
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
import { setPopup } from '#/actions/plugins/semantic'
import { popupOptions } from '#/data/plugins/semantic'
import { localize } from '#/actions/plugins/i18n'

export default {
  name: 'CloseButton',
  data () {
    return {
      isHovered: false
    }
  },
  computed: {
    popupTextFormatted () {
      return localize('layout.player.close')
    }
  },
  mounted () {
    setPopup(
      this.$refs.button,
      popupOptions()
    )
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

<template>
  <div
    class="the-visible-area-container"
    :class="{
      'player-panel-height': playerPlaying
    }"
  >
    <div
      ref="visible"
      class="the-visible-area"
    />
  </div>
</template>

<script>
import {
  mapState,
  mapActions
} from 'pinia'
import layoutStore from '@/stores/layout'
import playerStore from '@/stores/player'

export default {
  name: 'TheVisibleArea',
  computed: {
    ...mapState(
      playerStore,
      {
        playerPlaying: 'playing'
      }
    )
  },
  mounted () {
    this.setVisibleContext(
      this.$refs.visible
    )
  },
  methods: {
    ...mapActions(
      layoutStore,
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
  height: calc(100vh - #{$navbarHeight})
  top: $navbarHeight
  z-index: 10000
  &.player-panel-height
    height: calc(100vh - #{$navbarHeight} - #{$playerPanelHeight})

.the-visible-area
  @extend .w-100, .h-100, .relative
</style>

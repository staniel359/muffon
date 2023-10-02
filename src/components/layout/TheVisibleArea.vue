<template>
  <div
    class="the-visible-area-container width-100 fixed pointer-events-none top-navbar"
    :class="{
      'player-panel-height': playerPlaying
    }"
  >
    <div
      ref="visible"
      class="width-100 height-100 relative"
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

<style lang="sass" scoped></style>

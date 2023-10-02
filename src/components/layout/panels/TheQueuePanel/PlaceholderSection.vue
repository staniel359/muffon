<template>
  <div
    :class="{
      'height-player-panel': playerPlaying
    }"
  />
</template>

<script>
import {
  mapState
} from 'pinia'
import playerStore from '@/stores/player'

export default {
  name: 'PlaceholderSection',
  computed: {
    ...mapState(
      playerStore,
      {
        playerPlaying: 'playing'
      }
    )
  }
}
</script>

<style lang="sass" scoped></style>

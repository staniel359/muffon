<template>
  <BaseSourceIcon
    class="description source-icon-block"
    :source="source"
  />
</template>

<script>
import {
  mapState
} from 'pinia'
import playerStore from '@/stores/player'
import BaseSourceIcon from '@/components/icons/BaseSourceIcon.vue'

export default {
  name: 'SourceIconBlock',
  components: {
    BaseSourceIcon
  },
  computed: {
    ...mapState(
      playerStore,
      {
        playerPlaying: 'playing'
      }
    ),
    source () {
      return this.playerPlaying.source.name
    }
  }
}
</script>

<style lang="sass" scoped>
.source-icon-block
  margin-left: 0.5em
</style>

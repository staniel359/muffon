<template>
  <BaseSourceIcon
    class="description right"
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

<style lang="sass" scoped></style>

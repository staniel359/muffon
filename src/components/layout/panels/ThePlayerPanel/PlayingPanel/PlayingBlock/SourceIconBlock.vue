<template>
  <BaseSourceIcon
    class="description source-icon-block"
    :source="source"
  />
</template>

<script>
import {
  mapState
} from 'vuex'
import BaseSourceIcon from '@/components/BaseSourceIcon.vue'

export default {
  name: 'SourceIconBlock',
  components: {
    BaseSourceIcon
  },
  computed: {
    ...mapState(
      'player',
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
  margin-left: 0.5em !important
</style>

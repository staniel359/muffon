<template>
  <ScrobblePoint
    v-if="isRender"
  />
</template>

<script>
import {
  mapState
} from 'pinia'
import profileStore from '@/stores/profile'
import playerStore from '@/stores/player'
import ScrobblePoint from './ScrobblePointSection/ScrobblePoint.vue'

export default {
  name: 'ScrobblePointSection',
  components: {
    ScrobblePoint
  },
  computed: {
    ...mapState(
      profileStore,
      {
        profileId: 'id'
      }
    ),
    ...mapState(
      playerStore,
      {
        playerPlaying: 'playing',
        isPlayerWithScrobbling:
          'isWithScrobbling'
      }
    ),
    isRender () {
      return (
        this.profileId &&
          this.playerPlaying &&
          this.isPlayerWithScrobbling
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>

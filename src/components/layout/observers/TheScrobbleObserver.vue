<template>
  <div
    id="the-scrobble-observer"
  />
</template>

<script>
import {
  mapState
} from 'pinia'
import playerStore from '@/stores/player'
import createScrobble from '@/helpers/actions/api/scrobbler/create'
import {
  track as formatScrobblerTrack
} from '@/helpers/formatters/scrobbler'

export default {
  name: 'TheScrobbleObserver',
  computed: {
    ...mapState(
      playerStore,
      {
        playerPlaying: 'playing'
      }
    ),
    scrobbleArgs () {
      return {
        action: 'play',
        ...this.trackData
      }
    },
    trackData () {
      return formatScrobblerTrack(
        {
          trackData: this.playerPlaying
        }
      )
    }
  },
  watch: {
    playerPlaying: {
      immediate: true,
      handler: 'handlePlayerPlayingChange'
    }
  },
  methods: {
    handlePlayerPlayingChange () {
      this.playScrobble()
    },
    playScrobble () {
      createScrobble(
        this.scrobbleArgs
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>

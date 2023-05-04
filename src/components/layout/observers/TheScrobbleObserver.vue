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
import createScrobblerPlay
  from '@/helpers/actions/api/lastfm/scrobbler/play/create'
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
      createScrobblerPlay(
        this.trackData
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>

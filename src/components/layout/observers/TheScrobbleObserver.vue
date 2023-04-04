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
      return {
        title: this.trackTitle,
        artistName: this.artistName,
        albumTitle: this.albumTitle,
        duration: this.duration
      }
    },
    trackTitle () {
      return this.playerPlaying.title
    },
    artistName () {
      return this.playerPlaying.artist.name
    },
    albumTitle () {
      return this.playerPlaying.album?.title
    },
    duration () {
      return this.playerPlaying.duration
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

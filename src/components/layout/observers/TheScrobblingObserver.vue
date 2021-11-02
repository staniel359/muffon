<template>
  <div id="the-scrobbling-observer"></div>
</template>

<script>
import { mapState } from 'vuex'
import postScrobblerPlayData
  from '#/actions/api/lastfm/scrobbler/play/postData'
import postScrobblerSaveData
  from '#/actions/api/lastfm/scrobbler/save/postData'
import { updateStore } from '#/actions'

export default {
  name: 'TheScrobblingObserver',
  computed: {
    ...mapState('player', {
      playerPlaying: 'playing',
      isPlayerToScrobble: 'isToScrobble'
    }),
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
      return (
        this.playerPlaying.album ||
          this.playerPlaying.albums[0]
      )?.title
    },
    duration () {
      return this.playerPlaying.duration_seconds
    }
  },
  watch: {
    playerPlaying: {
      immediate: true,
      handler: 'handlePlayerPlayingChange'
    },
    isPlayerToScrobble: 'handleIsPlayerToScrobbleChange'
  },
  methods: {
    handlePlayerPlayingChange (value) {
      if (value) {
        postScrobblerPlayData({
          ...this.trackData
        })
      }
    },
    handleIsPlayerToScrobbleChange (value) {
      if (value) {
        postScrobblerSaveData({
          ...this.trackData
        }).then(this.handleSuccess)
      }
    },
    handleSuccess () {
      updateStore({
        'player.isScrobbled': true
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>

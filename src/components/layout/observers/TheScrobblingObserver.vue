<template>
  <div
    id="the-scrobbling-observer"
  />
</template>

<script>
import {
  mapState
} from 'vuex'
import createScrobblerPlay
  from '@/helpers/actions/api/lastfm/scrobbler/play/create'
import createScrobblerSave
  from '@/helpers/actions/api/lastfm/scrobbler/save/create'
import {
  updateGlobal as updateGlobalStore
} from '@/helpers/actions/store'

export default {
  name: 'TheScrobblingObserver',
  computed: {
    ...mapState(
      'player',
      {
        playerPlaying: 'playing',
        isPlayerScrobbling: 'isScrobbling',
        isPlayerToScrobble: 'isToScrobble'
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
      return this.playerPlaying.duration_seconds
    }
  },
  watch: {
    isPlayerScrobbling:
      'handleIsPlayerScrobblingChange',
    isPlayerToScrobble:
      'handleIsPlayerToScrobbleChange'
  },
  methods: {
    handleIsPlayerScrobblingChange (
      value
    ) {
      if (value) {
        createScrobblerPlay(
          {
            ...this.trackData
          }
        )
      }
    },
    handleIsPlayerToScrobbleChange (
      value
    ) {
      if (value) {
        createScrobblerSave(
          this.trackData
        ).then(
          this.handleScrobbleSaveSuccess
        )
      }
    },
    handleScrobbleSaveSuccess () {
      updateGlobalStore(
        {
          'player.isScrobbled': true
        },
        {
          isSave: false
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>

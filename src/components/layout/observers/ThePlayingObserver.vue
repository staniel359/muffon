<template>
  <div
    id="the-playing-observer"
  />
</template>

<script>
import {
  mapState
} from 'pinia'
import playerStore from '@/stores/player'
import profileStore from '@/stores/profile'
import {
  ipcRenderer
} from 'electron'
import updatePlaying from '@/helpers/actions/api/playing/update'

export default {
  name: 'ThePlayingObserver',
  computed: {
    ...mapState(
      playerStore,
      {
        playerPlaying: 'playing'
      }
    ),
    ...mapState(
      profileStore,
      {
        isShowProfilePlaying: 'isShowPlaying',
        profileId: 'id'
      }
    ),
    playing () {
      if (this.isUpdatePlaying) {
        return this.playingFormatted
      } else {
        return null
      }
    },
    playingFormatted () {
      return {
        source: this.sourceData,
        player_id: this.playerId,
        title: this.trackTitle,
        artist: this.artistData,
        artists: this.artists,
        album: this.albumData,
        image: this.imageData,
        duration: this.duration,
        audio: this.audioData
      }
    },
    sourceData () {
      return this.playerPlaying.source
    },
    playerId () {
      return this.playerPlaying.player_id
    },
    trackTitle () {
      return this.playerPlaying.title
    },
    artistData () {
      return this.playerPlaying.artist
    },
    artists () {
      return this.playerPlaying.artists
    },
    albumData () {
      return this.playerPlaying.album
    },
    imageData () {
      return this.playerPlaying.image
    },
    duration () {
      return this.playerPlaying.duration
    },
    audioData () {
      return {
        present: this.playerPlaying.audio.present
      }
    },
    isUpdatePlaying () {
      return (
        this.playerPlaying &&
          this.isShowProfilePlaying
      )
    }
  },
  watch: {
    profileId: {
      immediate: true,
      handler: 'handleProfileIdChange'
    },
    playerPlaying: 'handlePlayerPlayingChange',
    isShowProfilePlaying:
      'handleIsShowProfilePlayingChange'
  },
  mounted () {
    ipcRenderer.on(
      'logout',
      this.handleLogout
    )

    ipcRenderer.on(
      'exit',
      this.handleExit
    )
  },
  methods: {
    handleLogout () {
      if (this.isUpdatePlaying) {
        updatePlaying(
          {
            playing: null
          }
        )
      }
    },
    handleExit () {
      if (this.isUpdatePlaying) {
        updatePlaying(
          {
            playing: null
          }
        )
      }
    },
    handleProfileIdChange (
      value
    ) {
      if (
        value &&
          this.isUpdatePlaying
      ) {
        updatePlaying(
          {
            playing: this.playing
          }
        )
      }
    },
    handlePlayerPlayingChange () {
      if (this.isShowProfilePlaying) {
        updatePlaying(
          {
            playing: this.playing
          }
        )
      }
    },
    handleIsShowProfilePlayingChange () {
      if (this.playerPlaying) {
        updatePlaying(
          {
            playing: this.playing
          }
        )
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>

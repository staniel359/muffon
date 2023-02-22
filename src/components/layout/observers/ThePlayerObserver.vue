<template>
  <div
    id="the-player-observer"
  />
</template>

<script>
import {
  mapState
} from 'pinia'
import playerStore from '@/stores/player'
import {
  ipcRenderer
} from 'electron'

export default {
  name: 'ThePlayerObserver',
  computed: {
    ...mapState(
      playerStore,
      {
        playerPlaying: 'playing'
      }
    ),
    title () {
      if (this.playerPlaying) {
        return this.playerTitle
      } else {
        return null
      }
    },
    playerTitle () {
      return [
        this.artistName,
        this.trackTitle
      ].join(
        ' - '
      )
    },
    artistName () {
      return this.playerPlaying.artist.name
    },
    trackTitle () {
      return this.playerPlaying.title
    },
    mediaMetadata () {
      if (this.playerPlaying) {
        return new window.MediaMetadata(
          this.mediaMetadataOptions
        )
      } else {
        return null
      }
    },
    mediaMetadataOptions () {
      return {
        title: this.trackTitle,
        artist: this.artistName,
        album: this.albumTitle,
        artwork: [
          {
            src: this.playerImage
          }
        ]
      }
    },
    albumTitle () {
      return this.playerPlaying.album?.title
    },
    playerImage () {
      return this.playerPlaying.image?.small || ''
    }
  },
  watch: {
    playerPlaying: {
      immediate: true,
      handler: 'handlePlayerPlayingChange'
    },
    title: {
      immediate: true,
      handler: 'handleTitleChange'
    }
  },
  methods: {
    handlePlayerPlayingChange () {
      this.changeMediaMetadata()
    },
    handleTitleChange () {
      ipcRenderer.send(
        'set-title',
        this.title
      )

      ipcRenderer.send(
        'set-tray-tooltip',
        this.title
      )
    },
    changeMediaMetadata () {
      navigator
        .mediaSession
        .metadata = this.mediaMetadata
    }
  }
}
</script>

<style lang="sass" scoped></style>

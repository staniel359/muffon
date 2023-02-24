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
    trackFullTitle () {
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
      return new MediaMetadata(
        this.mediaMetadataOptions
      )
    },
    mediaMetadataOptions () {
      return {
        title: this.trackTitle,
        artist: this.artistName,
        album: this.albumTitle,
        artwork: [
          this.artworkData
        ]
      }
    },
    albumTitle () {
      return this.playerPlaying.album?.title
    },
    playerImage () {
      return this.playerPlaying.image?.small
    },
    artworkData () {
      return {
        src: (
          this.playerImage || ''
        )
      }
    }
  },
  watch: {
    playerPlaying: {
      immediate: true,
      handler: 'handlePlayerPlayingChange'
    }
  },
  beforeUnmount () {
    this.setMediaMetadata(
      null
    )

    this.setTitle(
      null
    )
  },
  methods: {
    handlePlayerPlayingChange () {
      this.setMediaMetadata(
        this.mediaMetadata
      )

      this.setTitle(
        this.trackFullTitle
      )
    },
    setMediaMetadata (
      value
    ) {
      navigator
        .mediaSession
        .metadata = value
    },
    setTitle (
      value
    ) {
      ipcRenderer.send(
        'set-title',
        value
      )

      ipcRenderer.send(
        'set-tray-tooltip',
        value
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>

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
import imagesSizes from '@/helpers/data/imagesSizes'

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
        artwork: this.images
      }
    },
    albumTitle () {
      return this.playerPlaying.album?.title
    },
    imageData () {
      return this.playerPlaying.image
    },
    images () {
      if (!this.imageData) { return [] }

      return imagesSizes.map(
        this.formatImage
      )
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
    },
    formatImage (
      {
        name,
        value
      }
    ) {
      return {
        src: this.imageData[
          name
        ],
        sizes:
          `${value}x${value}`
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>

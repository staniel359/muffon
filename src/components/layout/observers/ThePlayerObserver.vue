<template>
  <div id="the-player-observer"></div>
</template>

<script>
import { mapState } from 'vuex'
import { ipcRenderer } from 'electron'

export default {
  name: 'ThePlayerObserver',
  computed: {
    ...mapState('player', {
      playerPlaying: 'playing'
    }),
    title () {
      if (this.playerPlaying) {
        return this.playerTitle
      } else {
        return 'muffon'
      }
    },
    playerTitle () {
      return [
        this.artistName,
        this.trackFullTitle
      ].join(' - ')
    },
    artistName () {
      return this.playerPlaying.artist.name
    },
    trackFullTitle () {
      return [
        this.trackTitle,
        this.trackExtraTitleFormatted
      ].filter(e => e).join(' ')
    },
    trackTitle () {
      return this.playerPlaying.title
    },
    trackExtraTitleFormatted () {
      if (this.trackExtraTitle) {
        return `(${this.trackExtraTitle})`
      } else {
        return null
      }
    },
    trackExtraTitle () {
      return this.playerPlaying.extra_title
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
        artwork: [{
          src: this.playerImage
        }]
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
    playerPlaying: 'handlePlayerPlayingChange',
    title: 'handleTitleChange'
  },
  methods: {
    handlePlayerPlayingChange () {
      this.changeMediaMetadata()
    },
    handleTitleChange () {
      this.changeTitle()
    },
    changeTitle () {
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
      navigator.mediaSession.metadata =
        this.mediaMetadata
    }
  }
}
</script>

<style lang="sass" scoped></style>

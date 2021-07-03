<template>
  <div id="the-player-observer"></div>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import { ipcRenderer } from 'electron'

export default {
  name: 'ThePlayerObserver',
  computed: {
    ...mapGetters('audio', {
      audioStatusIcon: 'statusIcon'
    }),
    ...mapState('player', {
      playerPlaying: 'playing'
    }),
    title () {
      if (this.playerPlaying) {
        return this.playerFullTitle
      } else {
        return ''
      }
    },
    playerFullTitle () {
      return [
        this.audioStatusIcon,
        this.playerTitle
      ].filter(e => e).join(' ')
    },
    playerTitle () {
      return [
        this.playerArtistName,
        this.playerTrackFullTitle
      ].join(' - ')
    },
    playerArtistName () {
      return this.playerPlaying.artist.name
    },
    playerTrackFullTitle () {
      return [
        this.playerTrackTitle,
        this.playerTrackExtraTitleFormatted
      ].filter(e => e).join(' ')
    },
    playerTrackTitle () {
      return this.playerPlaying.title
    },
    playerTrackExtraTitleFormatted () {
      if (this.playerTrackExtraTitle) {
        return `(${this.playerTrackExtraTitle})`
      } else {
        return null
      }
    },
    playerTrackExtraTitle () {
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
        title: this.playerTrackTitle,
        artist: this.playerArtistName,
        album: this.playerAlbumTitle,
        artwork: [{
          src: this.playerImage
        }]
      }
    },
    playerAlbumTitle () {
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

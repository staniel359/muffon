<template>
  <div
    id="the-discord-observer"
  />
</template>

<script>
import {
  ipcRenderer
} from 'electron'
import {
  mapState
} from 'pinia'
import playerStore from '@/stores/player'

export default {
  name: 'TheDiscordObserver',
  data () {
    return {
      isConnected: false
    }
  },
  computed: {
    ...mapState(
      playerStore,
      {
        playerPlaying: 'playing'
      }
    ),
    playingDataFormatted () {
      return JSON.stringify(
        this.playingData
      )
    },
    playingData () {
      return {
        trackTitle: this.trackTitle,
        artistName: this.artistName,
        albumTitle: this.albumTitle,
        image: this.image,
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
    image () {
      return this.playerPlaying.image?.medium
    },
    duration () {
      return this.playerPlaying.duration
    }
  },
  watch: {
    playerPlaying:
      'handlePlayerPlayingChange'
  },
  mounted () {
    this.connect()
  },
  beforeUnmount () {
    if (this.isConnected) {
      this.resetActivity()
    }
  },
  methods: {
    handleLoginSuccess () {
      this.isConnected = true

      this.updateActivity()
    },
    handleError () {
      return null
    },
    handlePlayerPlayingChange () {
      if (this.isConnected) {
        this.updateActivity()
      }
    },
    connect () {
      return ipcRenderer.invoke(
        'connect-discord'
      ).then(
        this.handleLoginSuccess
      ).catch(
        this.handleError
      )
    },
    updateActivity () {
      if (this.playerPlaying) {
        this.setActivity()
      } else {
        this.resetActivity()
      }
    },
    setActivity () {
      ipcRenderer.invoke(
        'set-discord-activity',
        this.playingDataFormatted
      ).catch(
        this.handleError
      )
    },
    resetActivity () {
      ipcRenderer.invoke(
        'reset-discord-activity'
      ).catch(
        this.handleError
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>

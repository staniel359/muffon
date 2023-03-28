<template>
  <div
    id="the-anonymous-playing-observer"
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
import {
  playing as formatPlaying
} from '@/helpers/formatters'

export default {
  name: 'TheAnonymousPlayingObserver',
  computed: {
    ...mapState(
      playerStore,
      {
        playerPlaying: 'playing'
      }
    ),
    playerPlayingFormatted () {
      return formatPlaying(
        this.playerPlaying,
        {
          isWithCreated: true
        }
      )
    }
  },
  watch: {
    playerPlaying:
      'handlePlayerPlayingChange'
  },
  methods: {
    handlePlayerPlayingChange (
      value
    ) {
      if (value) {
        this.updatePlaying()
      }
    },
    updatePlaying () {
      const playingFormatted =
        JSON.stringify(
          this.playerPlayingFormatted
        )

      ipcRenderer.invoke(
        'add-electron-store-value',
        'history.player',
        playingFormatted
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>

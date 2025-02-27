<template>
  <div
    id="the-anonymous-playing-observer"
  />
</template>

<script>
import {
  mapState
} from 'pinia'
import playerStore from '@/stores/player'
import historyStore from '@/stores/history'
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
    ...mapState(
      historyStore,
      {
        isSavePlayerHistory: 'isSavePlayer'
      }
    ),
    playingFormatted () {
      return formatPlaying(
        this.playerPlaying,
        {
          isWithCreated: true
        }
      )
    },
    isSaveHistory () {
      return (
        this.playerPlaying &&
          this.isSavePlayerHistory
      )
    }
  },
  watch: {
    playerPlaying:
      'handlePlayerPlayingChange'
  },
  methods: {
    handlePlayerPlayingChange () {
      if (this.isSaveHistory) {
        this.updatePlaying()
      }
    },
    updatePlaying () {
      const playingFormatted =
        JSON.stringify(
          this.playingFormatted
        )

      window
        .mainProcess
        .sendAsyncCommand(
          'add-electron-store-value',
          'history.player',
          playingFormatted
        )
    }
  }
}
</script>

<style lang="sass" scoped></style>

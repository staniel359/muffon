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
import historyStore from '@/stores/history'
import {
  playing as formatPlaying
} from '@/helpers/formatters'
import updateHistory from '@/helpers/actions/api/history/update'
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
        isShowProfilePlaying: 'isShowPlaying'
      }
    ),
    ...mapState(
      historyStore,
      {
        isSavePlayerHistory: 'isSavePlayer'
      }
    ),
    playingFormatted () {
      if (this.playerPlaying) {
        return formatPlaying(
          this.playerPlaying
        )
      } else {
        return null
      }
    },
    publicPlayingFormatted () {
      if (this.isShowProfilePlaying) {
        return this.playingFormatted
      } else {
        return null
      }
    },
    isUpdatePublicPlaying () {
      return (
        this.isShowProfilePlaying &&
          this.playerPlaying
      )
    },
    historyArgs () {
      return {
        scope: 'player',
        playing:
          this.playingFormatted
      }
    },
    publicPlayingArgs () {
      return {
        playing:
          this.publicPlayingFormatted
      }
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
      'handlePlayerPlayingChange',
    isShowProfilePlaying:
      'handleIsShowProfilePlayingChange'
  },
  mounted () {
    if (this.isUpdatePublicPlaying) {
      this.updatePublicPlaying()
    }
  },
  methods: {
    handlePlayerPlayingChange () {
      if (this.isSaveHistory) {
        this.updatePlayerHistory()
      }

      if (this.isShowProfilePlaying) {
        this.updatePublicPlaying()
      }
    },
    handleIsShowProfilePlayingChange () {
      if (this.playerPlaying) {
        this.updatePublicPlaying()
      }
    },
    updatePlayerHistory () {
      updateHistory(
        this.historyArgs
      )
    },
    updatePublicPlaying () {
      updatePlaying(
        this.publicPlayingArgs
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>

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
        return this.playerPlaying
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
    handlePlayerPlayingChange (
      value
    ) {
      if (value) {
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

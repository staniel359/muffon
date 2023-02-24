<template>
  <div
    id="the-playing-public-observer"
  />
</template>

<script>
import {
  mapState
} from 'pinia'
import playerStore from '@/stores/player'
import socketMixin from '@/mixins/socketMixin'
import {
  playing as formatPlaying
} from '@/helpers/formatters'

export default {
  name: 'ThePlayingPublicObserver',
  mixins: [
    socketMixin
  ],
  data () {
    return {
      channel: 'PlayingPublicChannel'
    }
  },
  computed: {
    ...mapState(
      playerStore,
      {
        playerPlaying: 'playing'
      }
    ),
    updatePlayingMessage () {
      return JSON.stringify(
        {
          command: 'message',
          identifier: this.identifier,
          data: this.updateData
        }
      )
    },
    updateData () {
      return JSON.stringify(
        {
          action: 'update',
          payload: this.payload
        }
      )
    },
    payload () {
      return {
        playing:
          this.playingFormatted
      }
    },
    playingFormatted () {
      return formatPlaying(
        this.playerPlaying
      )
    }
  },
  watch: {
    isSubscribed:
      'handleIsSubscribedChange',
    playerPlaying:
      'handlePlayerPlayingChange'
  },
  methods: {
    handleIsSubscribedChange (
      value
    ) {
      if (value) {
        this.updatePlaying()
      }
    },
    handlePlayerPlayingChange () {
      if (this.isSubscribed) {
        this.updatePlaying()
      }
    },
    updatePlaying () {
      this.socket.send(
        this.updatePlayingMessage
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>

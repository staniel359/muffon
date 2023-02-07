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
import socketMixin from '@/mixins/socketMixin'

export default {
  name: 'ThePlayingObserver',
  mixins: [
    socketMixin
  ],
  data () {
    return {
      channel: 'PlayingChannel'
    }
  },
  computed: {
    ...mapState(
      playerStore,
      {
        playerPlaying: 'playing'
      }
    ),
    playingFormatted () {
      return {
        source: this.sourceData,
        player_id: this.playerId,
        title: this.trackTitle,
        artist: this.artistData,
        artists: this.artists,
        album: this.albumData,
        image: this.imageData,
        duration: this.duration,
        audio: this.audioData
      }
    },
    sourceData () {
      return this.playerPlaying.source
    },
    playerId () {
      return this.playerPlaying.player_id
    },
    trackTitle () {
      return this.playerPlaying.title
    },
    artistData () {
      return this.playerPlaying.artist
    },
    artists () {
      return this.playerPlaying.artists
    },
    albumData () {
      return this.playerPlaying.album
    },
    imageData () {
      return this.playerPlaying.image
    },
    duration () {
      return this.playerPlaying.duration
    },
    audioData () {
      return {
        present: this.playerPlaying.audio.present
      }
    },
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
        playing: this.playingFormatted
      }
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

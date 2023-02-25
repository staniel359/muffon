<template>
  <div
    id="the-anonymous-playing-observer"
  />
</template>

<script>
import electronStore from '#/plugins/electronStore'
import moment from 'moment-timezone'
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
    playingFormattedWithCreated () {
      const created =
        moment.utc().toDate()

      return {
        ...this.playingFormatted,
        created
      }
    },
    playingFormatted () {
      return formatPlaying(
        this.playerPlaying
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
      const tracks =
        electronStore.get(
          'history.player'
        )

      const newTracks = [
        ...tracks,
        this.playingFormattedWithCreated
      ]

      electronStore.set(
        {
          'history.player': newTracks
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>

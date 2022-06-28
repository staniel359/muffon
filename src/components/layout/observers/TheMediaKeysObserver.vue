<template>
  <div
    id="the-media-keys-observer"
  />
</template>

<script>
import getQueueTrack from '*/helpers/actions/queue/track/get'
import {
  updateGlobal as updateGlobalStore
} from '*/helpers/actions/store'

export default {
  name: 'TheMediaKeysObserver',
  data () {
    return {
      mediaActionsHandlers: [
        {
          action: 'previoustrack',
          handler: this.handlePressPrev
        },
        {
          action: 'nexttrack',
          handler: this.handlePressNext
        },
        {
          action: 'stop',
          handler: this.handlePressStop
        }
      ]
    }
  },
  mounted () {
    this.mediaActionsHandlers.forEach(
      this.setMediaActionHandler
    )
  },
  methods: {
    handlePressPrev () {
      getQueueTrack(
        {
          position: 'prev'
        }
      )
    },
    handlePressNext () {
      getQueueTrack(
        {
          position: 'next'
        }
      )
    },
    handlePressStop () {
      updateGlobalStore(
        {
          'player.playing': null
        }
      )
    },
    setMediaActionHandler (
      {
        action,
        handler
      }
    ) {
      navigator
        .mediaSession
        .setActionHandler(
          action,
          handler
        )
    }
  }
}
</script>

<style lang="sass" scoped></style>

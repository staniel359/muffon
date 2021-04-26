<template>
  <div class="player-timer">
    {{ audioCurrentTimeFormatted }} / {{ audioDurationFormatted }}
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { seconds as formatSeconds } from '#/formatters'

export default {
  name: 'TimerPanel',
  computed: {
    ...mapState('audio', {
      audioCurrentTime: 'currentTime',
      audioDuration: 'duration'
    }),
    audioCurrentTimeFormatted () {
      return formatSeconds(
        this.audioCurrentTime
      )
    },
    audioDurationFormatted () {
      return formatSeconds(
        this.audioDuration
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.player-timer
  flex: 0.25
</style>

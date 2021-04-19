<template>
  <div class="timer-panel">
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
.timer-panel
  flex: 0.25
</style>

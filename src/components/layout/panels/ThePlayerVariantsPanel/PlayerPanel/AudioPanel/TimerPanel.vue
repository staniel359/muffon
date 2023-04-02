<template>
  <div
    class="player-timer"
    v-text="audioTime"
  />
</template>

<script>
import {
  mapState
} from 'pinia'
import audioStore from '@/stores/audio'
import {
  seconds as formatSeconds
} from '@/helpers/formatters/dateTimeString'

export default {
  name: 'TimerPanel',
  computed: {
    ...mapState(
      audioStore,
      {
        audioCurrentTime: 'currentTime',
        audioDuration: 'duration'
      }
    ),
    audioTime () {
      return [
        this.audioCurrentTimeSeconds,
        this.audioDurationSeconds
      ].join(
        ' / '
      )
    },
    audioCurrentTimeSeconds () {
      return formatSeconds(
        this.audioCurrentTime
      )
    },
    audioDurationSeconds () {
      return formatSeconds(
        this.audioDuration
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.player-timer
  @extend .cursor-default
  flex: 0.3
</style>

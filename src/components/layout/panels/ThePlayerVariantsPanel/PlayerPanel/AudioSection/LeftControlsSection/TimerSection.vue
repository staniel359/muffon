<template>
  <strong
    class="cursor-default"
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
  name: 'TimerSection',
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

<style lang="sass" scoped></style>

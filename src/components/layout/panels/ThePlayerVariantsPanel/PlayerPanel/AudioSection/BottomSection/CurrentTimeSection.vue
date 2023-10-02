<template>
  <div class="main-left-medium-section cursor-default">
    <strong
      v-text="audioCurrentTimeSeconds"
    />
  </div>
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
  name: 'CurrentTimeSection',
  computed: {
    ...mapState(
      audioStore,
      {
        audioCurrentTime: 'currentTime'
      }
    ),
    audioCurrentTimeSeconds () {
      return formatSeconds(
        this.audioCurrentTime
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>

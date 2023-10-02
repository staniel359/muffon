<template>
  <div class="main-right-medium-section cursor-default">
    <strong
      v-text="audioDurationSeconds"
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
  name: 'DurationSection',
  computed: {
    ...mapState(
      audioStore,
      {
        audioDuration: 'duration'
      }
    ),
    audioDurationSeconds () {
      return formatSeconds(
        this.audioDuration
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>

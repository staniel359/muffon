<template>
  <div
    v-text="durationFormatted"
  />
</template>

<script>
import {
  seconds as formatSeconds
} from '@/helpers/formatters/dateTimeString'

export default {
  name: 'BaseDurationSection',
  props: {
    duration: {
      type: [
        Number,
        String
      ],
      required: true
    }
  },
  computed: {
    durationFormatted () {
      if (this.isNumber) {
        return formatSeconds(
          this.duration
        )
      } else {
        return this.duration
      }
    },
    isNumber () {
      return (
        typeof this.duration === 'number'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>

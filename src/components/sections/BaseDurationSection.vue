<template>
  <div
    v-text="durationFormatted"
  />
</template>

<script>
import {
  seconds as formatSeconds
} from '@/helpers/formatters'

export default {
  name: 'BaseDurationSection',
  props: {
    duration: {
      type: Number,
      required: true
    }
  },
  computed: {
    durationFormatted () {
      return formatSeconds(
        this.duration
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>

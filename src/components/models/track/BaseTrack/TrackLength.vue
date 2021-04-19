<template>
  <div class="description track-length" >
    {{ lengthFormatted }}
  </div>
</template>

<script>
import { seconds as formatSeconds } from '#/formatters'

export default {
  name: 'TrackLength',
  props: {
    length: {
      type: Number,
      required: true
    }
  },
  computed: {
    lengthFormatted () {
      return formatSeconds(this.length)
    }
  }
}
</script>

<style lang="sass" scoped>
.track-length
  margin-left: $trackContentMarginWidth
</style>

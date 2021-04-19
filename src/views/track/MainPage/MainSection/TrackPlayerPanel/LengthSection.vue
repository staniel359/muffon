<template>
  <div class="track-length">
    {{ lengthFormatted }}
  </div>
</template>

<script>
import { seconds as formatSeconds } from '#/formatters'

export default {
  name: 'LengthSection',
  props: {
    length: Number
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
  @extend .d-flex, .align-items-center
  border-left: $border
  padding: 0 1em
</style>

<template>
  <small
    class="description"
    v-html="tracksCountText"
  />
</template>

<script>
import {
  number as formatNumber
} from '*/helpers/formatters'

export default {
  name: 'TracksCountSection',
  props: {
    tracksCount: {
      type: Number,
      required: true
    }
  },
  computed: {
    tracksCountText () {
      return this.$tc(
        'counters.nominative.tracks',
        this.tracksCount,
        {
          count: this.tracksCountStrong
        }
      )
    },
    tracksCountStrong () {
      return `<strong>${this.tracksCountFormatted}</strong>`
    },
    tracksCountFormatted () {
      return formatNumber(
        this.tracksCount
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>

<template>
  <div class="description track-index">
    {{ indexFormatted }}
  </div>
</template>

<script>
export default {
  name: 'TrackIndex',
  props: {
    index: {
      type: Number,
      required: true
    }
  },
  computed: {
    indexFormatted () {
      return `${this.index + 1}.`
    }
  }
}
</script>

<style lang="sass" scoped>
.track-index
  margin-right: $trackContentMarginWidth
</style>

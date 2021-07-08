<template>
  <div class="track-duration">
    {{ duration }}
  </div>
</template>

<script>
export default {
  name: 'DurationSection',
  props: {
    duration: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="sass" scoped>
.track-duration
  @extend .d-flex, .align-items-center
  padding: 0 1em
</style>

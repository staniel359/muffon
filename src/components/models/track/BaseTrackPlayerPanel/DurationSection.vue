<template>
  <div
    class="track-section"
    v-text="duration"
  />
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
.track-section
  @extend .d-flex, .align-items-center
  padding: 0 1em
</style>

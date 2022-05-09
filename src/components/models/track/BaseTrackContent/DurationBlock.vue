<template>
  <div
    class="description track-duration"
    v-text="duration"
  />
</template>

<script>
export default {
  name: 'DurationBlock',
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
  margin-left: 0.5em
</style>

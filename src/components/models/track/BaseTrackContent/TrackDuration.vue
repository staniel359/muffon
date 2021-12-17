<template>
  <div class="description track-duration" >
    {{ duration }}
  </div>
</template>

<script>
export default {
  name: 'TrackDuration',
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

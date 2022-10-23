<template>
  <div
    class="description track-index"
    v-text="indexText"
  />
</template>

<script>
export default {
  name: 'IndexBlock',
  props: {
    index: {
      type: Number,
      required: true
    }
  },
  computed: {
    indexText () {
      return `${this.index + 1}.`
    }
  }
}
</script>

<style lang="sass" scoped>
.track-index
  margin-right: 0.5em
</style>

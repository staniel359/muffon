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
[dir="ltr"]
  .track-index
    margin-right: 0.5em
[dir="rtl"]
  .track-index
    margin-left: 0.5em
</style>

<template>
  <div
    class="description left main-right-small-section"
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

<style lang="sass" scoped></style>

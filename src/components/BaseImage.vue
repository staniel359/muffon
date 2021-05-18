<template>
  <img
    class="ui image"
    :[attribute]="image"
  />
</template>

<script>
export default {
  name: 'BaseImage',
  props: {
    image: {
      type: String,
      required: true
    },
    isLazy: Boolean
  },
  computed: {
    attribute () {
      return this.isLazy ? 'data-lazy' : 'src'
    }
  }
}
</script>

<style lang="sass" scoped></style>

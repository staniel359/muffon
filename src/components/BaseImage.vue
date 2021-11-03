<template>
  <img
    class="ui image main-image"
    :class="{ inverted: isDarkMode }"
    :[attribute]="image"
    @click="handleClick"
  />
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'BaseImage',
  props: {
    image: {
      type: String,
      required: true
    },
    isLazy: Boolean
  },
  emits: [
    'click'
  ],
  computed: {
    ...mapState('layout', [
      'isDarkMode'
    ]),
    attribute () {
      return this.isLazy ? 'data-lazy' : 'src'
    }
  },
  methods: {
    handleClick () {
      this.$emit('click')
    }
  }
}
</script>

<style lang="sass" scoped></style>

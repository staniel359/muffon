<template>
  <img
    class="ui image main-image"
    :class="{ inverted: isDarkMode }"
    :[attribute]="image"
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
  computed: {
    ...mapState('layout', [
      'isDarkMode'
    ]),
    attribute () {
      return this.isLazy ? 'data-lazy' : 'src'
    }
  }
}
</script>

<style lang="sass" scoped></style>

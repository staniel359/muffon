<template>
  <div
    v-if="isLoading"
    class="ui image placeholder"
    :class="{
      rounded: isRounded,
      circular: isCircular,
      bordered: isBordered,
      inverted: isDarkMode
    }"
  ></div>
  <img
    v-else-if="image"
    class="ui image"
    :class="{
      rounded: isRounded,
      circular: isCircular,
      bordered: isBordered
    }"
    :src="image"
  />
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'BaseImage',
  props: {
    image: String,
    isLoading: Boolean,
    isRounded: Boolean,
    isCircular: Boolean,
    isBordered: Boolean
  },
  computed: {
    ...mapState('layout', [
      'isDarkMode'
    ])
  }
}
</script>

<style lang="sass" scoped></style>

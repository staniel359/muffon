<template>
  <img
    class="ui image main-image"
    :class="{
      inverted: isDarkMode
    }"
    :[attribute]="imageConditional"
    @click="handleClick"
  >
</template>

<script>
import {
  mapState
} from 'pinia'
import layoutStore from '@/stores/layout'
import {
  images as defaultImages
} from '@/helpers/data/defaultImages'

export default {
  name: 'BaseImage',
  props: {
    image: String,
    model: String,
    isLazy: Boolean
  },
  emits: [
    'click'
  ],
  computed: {
    ...mapState(
      layoutStore,
      [
        'isDarkMode'
      ]
    ),
    attribute () {
      return this.isLazy
        ? 'data-lazy'
        : 'src'
    },
    imageConditional () {
      return (
        this.image ||
          this.defaultImage
      )
    },
    defaultImage () {
      return defaultImages[
        this.model
      ]
    }
  },
  methods: {
    handleClick () {
      this.$emit(
        'click'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>

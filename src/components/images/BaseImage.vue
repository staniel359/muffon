<template>
  <img
    ref="image"
    class="ui image main-image"
    :class="{
      inverted: isDarkMode,
      contained: isContained
    }"
    :[attribute]="imageConditional"
    @click="handleClick"
    @error="handleError"
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
    isLazy: Boolean,
    isContained: Boolean
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
      if (this.isLazy) {
        return 'data-lazy'
      } else {
        return 'src'
      }
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
    },
    handleError () {
      this.setDefaultImage()
    },
    setDefaultImage () {
      if (this.$refs.image) {
        this.$refs.image.src =
          this.defaultImage
      }
    }
  }
}
</script>

<style lang="sass" scoped></style>

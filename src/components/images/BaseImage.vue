<template>
  <div
    v-if="isLoading"
    class="ui image placeholder main-image"
    :class="[
      borderedRaisedClass,
      {
        inverted: isDarkMode
      }
    ]"
  />
  <img
    v-else
    ref="image"
    class="ui image main-image"
    :class="[
      borderedRaisedClass,
      {
        inverted: isDarkMode,
        contained: isContained
      }
    ]"
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
    isContained: Boolean,
    isLoading: Boolean,
    isBordered: Boolean
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
    },
    borderedRaisedClass () {
      if (
        this.isDarkMode ||
          this.isBordered
      ) {
        return 'bordered'
      } else {
        return 'raised'
      }
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

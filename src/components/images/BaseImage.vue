<template>
  <div
    v-if="isLoading"
    class="ui image placeholder base-image"
    :class="[
      {
        inverted: isDarkMode,
        [borderedRaisedClass]: !isPlain
      }
    ]"
  />
  <img
    v-else
    ref="image"
    class="ui image base-image"
    :class="[
      {
        inverted: isDarkMode,
        contained: isContained,
        [borderedRaisedClass]: !isPlain
      }
    ]"
    :[attribute]="imageConditional"
    @click="handleClick"
    @error.once="handleError"
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
    model: {
      type: String,
      default: 'plain'
    },
    image: String,
    isLazy: Boolean,
    isContained: Boolean,
    isLoading: Boolean,
    isBordered: Boolean,
    isPlain: Boolean
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
      if (this.isWithBorder) {
        return 'bordered'
      } else {
        return 'raised'
      }
    },
    isWithBorder () {
      return (
        this.isDarkMode ||
          this.isBordered
      )
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

<style lang="sass" scoped>
.base-image
  @extend .object-fit-cover
  &:not(.contained)
    &.bordered
      @extend .border
      &.inverted
        @extend .border-inverted
  &.contained
    @extend .object-fit-contain, .no-border, .border-inner
    background-color: black !important
    &.inverted
      @extend .border-inner-inverted
  &.raised
    &:not(.main-logo-image)
      @extend .shadow
  &.rounded
    @extend .border-radius
  &.rounded-medium
    @extend .border-radius-medium
  &.rounded-small
    @extend .border-radius-small
</style>

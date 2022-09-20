<template>
  <div ref="slider">
    <template
      v-for="imageData in images"
      :key="imageData.uuid"
    >
      <slot
        :image="imageData[size]"
      />
    </template>
  </div>
</template>

<script>
import {
  setSlider,
  clearSliderPrevImages,
  refreshSlider,
  setSliderOptions
} from '@/helpers/actions/plugins/slick'

export default {
  name: 'BaseImageModalSliderContainer',
  props: {
    size: {
      type: String,
      required: true
    },
    images: {
      type: Array,
      default () {
        return []
      }
    },
    options: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  emits: [
    'init'
  ],
  watch: {
    images: 'handleImagesChange',
    options: 'handleOptionsChange'
  },
  mounted () {
    setSlider(
      this.$refs.slider,
      this.options
    )

    this.$emit(
      'init',
      this.$refs.slider
    )
  },
  methods: {
    async handleImagesChange () {
      clearSliderPrevImages(
        this.$refs.slider
      )

      await this.$nextTick()

      refreshSlider(
        this.$refs.slider
      )
    },
    handleOptionsChange (
      value
    ) {
      setSliderOptions(
        this.$refs.slider,
        value
      )
    }
  }
}
</script>

<style lang="sass" scoped>
::v-deep(.slick-slide)
  outline: none
  .image
    border-top: $borderInverted
    border-bottom: $borderInverted
    border-left: $borderInverted
  &:last-child
    .image
      border-right: $borderInverted
</style>

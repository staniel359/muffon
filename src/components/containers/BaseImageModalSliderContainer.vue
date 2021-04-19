<template>
  <div ref="slider">
    <template
      v-for="imageData in images"
      :key="imageData.uuid"
    >
      <slot :image="imageData[size]"></slot>
    </template>
  </div>
</template>

<script>
import {
  setSlider,
  clearSliderPrevImages,
  refreshSlider,
  setSliderOptions
} from '#/actions/plugins/slick'

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
    setSlider(this.$refs.slider, this.options)

    this.$emit('init', this.$refs.slider)
  },
  methods: {
    handleImagesChange () {
      clearSliderPrevImages(this.$refs.slider)

      this.$nextTick(() => {
        refreshSlider(this.$refs.slider)
      })
    },
    handleOptionsChange (value) {
      setSliderOptions(this.$refs.slider, value)
    }
  }
}
</script>

<style lang="sass" scoped>
::v-deep(.slick-slide)
  outline: none
</style>

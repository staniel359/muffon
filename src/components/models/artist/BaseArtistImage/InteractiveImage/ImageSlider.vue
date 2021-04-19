<template>
  <div ref="slider">
    <BaseImage
      v-for="(imageData, index) in imagesFormatted"
      class="slider-image"
      :key="imageData.uuid"
      :isRounded="isRounded"
      :isCircular="isCircular"
      :isBordered="isBordered"
      :image="imageData[size]"
      @click="handleClick(index)"
    />
  </div>
</template>

<script>
import BaseImage from '@/BaseImage.vue'
import { collection as formatCollection } from '#/formatters'
import { setSlider } from '#/actions/plugins/slick'
import { artistImagesMainSliderOptions } from '#/data/plugins/slick'

export default {
  name: 'ImageSlider',
  components: {
    BaseImage
  },
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
    isRounded: Boolean,
    isCircular: Boolean,
    isBordered: Boolean
  },
  emits: [
    'click'
  ],
  computed: {
    imagesFormatted () {
      return formatCollection(this.images)
    }
  },
  mounted () {
    setSlider(
      this.$refs.slider,
      artistImagesMainSliderOptions()
    )
  },
  methods: {
    handleClick (index) {
      this.$emit('click', index)
    }
  }
}
</script>

<style lang="sass" scoped>
.slider-image
  @extend .cursor-zoom-in

::v-deep(.slick-next)
  right: 10px !important
::v-deep(.slick-prev)
  left: 10px !important
::v-deep(.slick-arrow)
  z-index: 1

.slick-slider
  ::v-deep(.slick-arrow)
    @extend .d-none
  &:hover
    ::v-deep(.slick-arrow)
      @extend .d-block
</style>

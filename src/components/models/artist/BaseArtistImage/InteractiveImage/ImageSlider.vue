<template>
  <div ref="slider">
    <BaseImage
      v-for="(imageData, index) in imagesFormatted"
      class="rounded"
      :key="imageData.uuid"
      :image="imageData.medium"
      @click="handleImageClick(index)"
    />
  </div>
</template>

<script>
import BaseImage from '@/BaseImage.vue'
import { artistImagesMainSliderOptions } from '#/data/plugins/slick'
import { setSlider } from '#/actions/plugins/slick'
import { collection as formatCollection } from '#/formatters'

export default {
  name: 'ImageSlider',
  components: {
    BaseImage
  },
  props: {
    images: {
      type: Array,
      default () {
        return []
      }
    }
  },
  emits: [
    'imageClick'
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
    handleImageClick (index) {
      this.$emit('imageClick', index)
    }
  }
}
</script>

<style lang="sass" scoped>
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

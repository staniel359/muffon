<template>
  <BaseImageModalSliderContainer
    size="original"
    :images="images"
    :options="sliderOptions"
    @init="handleInit"
  >
    <template #default="slotProps">
      <div class="image-container">
        <BaseImage :image="slotProps.image" />
      </div>
    </template>
  </BaseImageModalSliderContainer>
</template>

<script>
import BaseImage from '@/BaseImage.vue'
import BaseImageModalSliderContainer
  from '@/containers/BaseImageModalSliderContainer.vue'
import { artistImagesModalMainSliderOptions } from '#/data/plugins/slick'

export default {
  name: 'MainSlider',
  components: {
    BaseImageModalSliderContainer,
    BaseImage
  },
  props: {
    images: Array,
    syncSlider: HTMLDivElement
  },
  emits: [
    'init'
  ],
  computed: {
    sliderOptions () {
      return artistImagesModalMainSliderOptions({
        syncSlider: this.syncSlider
      })
    }
  },
  methods: {
    handleInit (el) {
      this.$emit('init', el)
    }
  }
}
</script>

<style lang="sass" scoped>
.image-container
  @extend .d-flex, .align-items-center, .justify-content-center
  height: calc(#{$imageModalHeight} - #{$imageModalThumbHeight} - 25px)
  margin-bottom: 25px
  .image
    max-height: 100%

::v-deep(.slick-prev)
  left: 20px
  z-index: 1
::v-deep(.slick-next)
  right: 20px
</style>

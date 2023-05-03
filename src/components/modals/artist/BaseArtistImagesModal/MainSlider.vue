<template>
  <BaseImageModalSliderContainer
    ref="slider"
    size="original"
    :images="images"
    :options="sliderOptions"
  >
    <template
      #default="slotProps"
    >
      <div class="image-container">
        <BaseImage
          :image="slotProps.image"
          is-lazy
          is-bordered
        />
      </div>
    </template>
  </BaseImageModalSliderContainer>
</template>

<script>
import BaseImage from '@/components/images/BaseImage.vue'
import BaseImageModalSliderContainer
  from '@/components/containers/BaseImageModalSliderContainer.vue'
import {
  artistImagesModalMainSliderOptions
} from '@/helpers/formatters/plugins/slick'

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
  computed: {
    sliderOptions () {
      return artistImagesModalMainSliderOptions(
        {
          syncSlider: this.syncSlider
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.image-container
  @extend .d-flex, .align-items-center, .justify-content-center
  height: calc(#{$imageModalHeight} - #{$imageModalThumbHeight} - 1.5em)
  margin-bottom: 1.5em
  .image
    max-height: 100%
</style>

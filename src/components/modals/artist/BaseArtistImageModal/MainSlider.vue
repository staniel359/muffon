<template>
  <BaseImageModalSliderContainer
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
} from '@/helpers/data/plugins/slick'

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
    @extend .border-inverted
    max-height: 100%

::v-deep(.slick-prev)
  left: 20px
  z-index: 1
::v-deep(.slick-next)
  right: 20px
</style>

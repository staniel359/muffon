<template>
  <BaseImageModalSliderContainer
    ref="slider"
    class="images-main-slider"
    size="original"
    :images="images"
    :options="sliderOptions"
  >
    <template
      #default="slotProps"
    >
      <div class="image-container middle-center-aligned">
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
  main as artistImagesModalMainSliderOptions
} from '@/helpers/formatters/plugins/slick/options/artist'

export default {
  name: 'MainSlider',
  components: {
    BaseImageModalSliderContainer,
    BaseImage
  },
  props: {
    images: Array,
    syncSlider: HTMLDivElement,
    isRtl: Boolean
  },
  computed: {
    sliderOptions () {
      return artistImagesModalMainSliderOptions(
        {
          syncSlider: this.syncSlider,
          isRtl: this.isRtl
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>

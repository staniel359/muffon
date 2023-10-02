<template>
  <BaseImageModalSliderContainer
    ref="slider"
    class="images-thumbs-slider"
    size="small"
    :images="images"
    :options="sliderOptions"
  >
    <template
      #default="slotProps"
    >
      <div class="main-image-container cursor-pointer">
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
  thumbs as artistImagesModalThumbsSliderOptions
} from '@/helpers/formatters/plugins/slick/options/artist'

export default {
  name: 'ThumbsSlider',
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
      return artistImagesModalThumbsSliderOptions(
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

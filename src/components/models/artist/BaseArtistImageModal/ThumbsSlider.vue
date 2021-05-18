<template>
  <BaseImageModalSliderContainer
    size="small"
    :images="images"
    :options="sliderOptions"
    @init="handleInit"
  >
    <template #default="slotProps">
      <div class="image-container">
        <BaseImage
          :image="slotProps.image"
          isLazy
        />
      </div>
    </template>
  </BaseImageModalSliderContainer>
</template>

<script>
import BaseImage from '@/BaseImage.vue'
import BaseImageModalSliderContainer
  from '@/containers/BaseImageModalSliderContainer.vue'
import { artistImagesModalThumbsSliderOptions } from '#/data/plugins/slick'

export default {
  name: 'ThumbsSlider',
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
      return artistImagesModalThumbsSliderOptions({
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
  @extend .cursor-pointer
  height: $imageModalThumbHeight
</style>

<template>
  <div
    v-bind="$attrs"
    class="image-container"
  >
    <ImagesPageButton :artistName="artistName" />

    <ImageSlider
      :images="images"
      @imageClick="handleImageClick"
    />
  </div>

  <BaseArtistImageModal
    :images="images"
    @init="handleModalInit"
    @mainSliderInit="handleMainSliderInit"
  />
</template>

<script>
import ImagesPageButton from './InteractiveImage/ImagesPageButton.vue'
import ImageSlider from './InteractiveImage/ImageSlider.vue'
import BaseArtistImageModal from '@/models/artist/BaseArtistImageModal.vue'
import { goToSliderSlide } from '#/actions/plugins/slick'
import { showModal } from '#/actions/plugins/semantic'

export default {
  name: 'InteractiveImage',
  components: {
    ImageSlider,
    BaseArtistImageModal,
    ImagesPageButton
  },
  props: {
    artistName: String,
    images: Array
  },
  data () {
    return {
      modal: null,
      mainSlider: null
    }
  },
  methods: {
    handleModalInit (el) {
      this.modal = el
    },
    handleMainSliderInit (el) {
      this.mainSlider = el
    },
    handleImageClick (index) {
      goToSliderSlide(this.mainSlider, index)

      this.$nextTick(() => {
        showModal(this.modal)
      })
    }
  }
}
</script>

<style lang="sass" scoped>
.image-container
  @extend .relative, .cursor-zoom-in
  .view-more-link
    @extend .d-none
  &:hover
    .view-more-link
      @extend .d-block
</style>

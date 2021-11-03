<template>
  <div class="image-container">
    <MoreLinkButton
      :artistName="artistName"
    />

    <BaseImage
      class="rounded"
      :image="imageData.medium"
      @click="handleClick"
    />

    <BaseArtistImageModal
      :images="images"
      @init="handleModalInit"
      @mainSliderInit="handleMainSliderInit"
    />
  </div>
</template>

<script>
import MoreLinkButton from './InteractiveImage/MoreLinkButton.vue'
import BaseImage from '@/BaseImage.vue'
import BaseArtistImageModal from '@/models/artist/BaseArtistImageModal.vue'
import { showModal } from '#/actions/plugins/semantic'

export default {
  name: 'InteractiveImage',
  components: {
    MoreLinkButton,
    BaseImage,
    BaseArtistImageModal
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
  computed: {
    imageData () {
      return this.images[0]
    }
  },
  methods: {
    handleModalInit (el) {
      this.modal = el
    },
    handleMainSliderInit (el) {
      this.mainSlider = el
    },
    handleClick () {
      showModal(this.modal)
    }
  }
}
</script>

<style lang="sass" scoped>
.image-container
  @extend .cursor-zoom-in
  .more-link-button
    @extend .d-none
  &:hover
    .more-link-button
      @extend .d-block
</style>

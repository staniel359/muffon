<template>
  <div class="image-container">
    <MoreLinkButton
      :artist-name="artistName"
    />

    <BaseImage
      v-bind="$attrs"
      :image="imageData.medium"
      @click="handleClick"
    />

    <BaseArtistImageModal
      :images="images"
      is-reset
      @init="handleModalInit"
      @main-slider-init="handleMainSliderInit"
    />
  </div>
</template>

<script>
import MoreLinkButton from './InteractiveImage/MoreLinkButton.vue'
import BaseImage from '*/components/images/BaseImage.vue'
import BaseArtistImageModal
  from '*/components/modals/artist/BaseArtistImageModal.vue'
import {
  showModal
} from '*/helpers/actions/plugins/semantic'

export default {
  name: 'InteractiveImage',
  components: {
    MoreLinkButton,
    BaseImage,
    BaseArtistImageModal
  },
  props: {
    imageData: {
      type: Object,
      required: true
    },
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
    handleModalInit (
      element
    ) {
      this.modal = element
    },
    handleMainSliderInit (
      element
    ) {
      this.mainSlider = element
    },
    handleClick () {
      showModal(
        this.modal
      )
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

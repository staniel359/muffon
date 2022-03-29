<template>
  <div class="image-container">
    <MoreLinkButton
      :artistName="artistName"
    />

    <BaseImage
      v-bind="$attrs"
      :image="imageData.medium"
      @click="handleClick"
    />

    <BaseArtistImageModal
      :images="images"
      isReset
      @init="handleModalInit"
      @mainSliderInit="handleMainSliderInit"
    />
  </div>
</template>

<script>
import MoreLinkButton from './InteractiveImage/MoreLinkButton.vue'
import BaseImage from '*/components/images/BaseImage.vue'
import BaseArtistImageModal
  from '*/components/modals/artist/BaseArtistImageModal.vue'
import { showModal } from '*/helpers/actions/plugins/semantic'

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

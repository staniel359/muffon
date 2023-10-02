<template>
  <div class="image-container main-visibility-container">
    <BaseImage
      v-bind="$attrs"
      class="main-zoomable-image"
      :image="imageData.medium"
      @click="handleClick"
    />

    <BaseArtistImagesModal
      ref="modal"
      :images="images"
      is-reset
    />

    <MoreLinkButton
      :artist-name="artistName"
    />
  </div>
</template>

<script>
import MoreLinkButton from './InteractiveImage/MoreLinkButton.vue'
import BaseImage from '@/components/images/BaseImage.vue'
import BaseArtistImagesModal
  from '@/components/modals/artist/BaseArtistImagesModal.vue'

export default {
  name: 'InteractiveImage',
  components: {
    MoreLinkButton,
    BaseImage,
    BaseArtistImagesModal
  },
  props: {
    imageData: {
      type: Object,
      required: true
    },
    artistName: String,
    images: Array
  },
  methods: {
    handleClick () {
      this.showModal()
    },
    showModal () {
      this.$refs
        .modal
        .show()
    }
  }
}
</script>

<style lang="sass" scoped></style>

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
      ref="modal"
      :images="images"
      is-reset
    />
  </div>
</template>

<script>
import MoreLinkButton from './InteractiveImage/MoreLinkButton.vue'
import BaseImage from '*/components/images/BaseImage.vue'
import BaseArtistImageModal
  from '*/components/modals/artist/BaseArtistImageModal.vue'

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

<style lang="sass" scoped>
.image-container
  @extend .cursor-zoom-in
  .more-link-button
    @extend .d-none
  &:hover
    .more-link-button
      @extend .d-block
</style>

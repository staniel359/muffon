<template>
  <div class="main-image-container">
    <BaseImage
      class="rounded bordered album-image"
      model="album"
      :image="imageData?.medium"
      @click="handleImageClick"
    />

    <BaseAlbumImageModal
      ref="modal"
      :image="imageData?.original"
    />
  </div>
</template>

<script>
import BaseImage from '*/components/images/BaseImage.vue'
import BaseAlbumImageModal
  from '*/components/modals/album/BaseAlbumImageModal.vue'

export default {
  name: 'ImageSection',
  components: {
    BaseImage,
    BaseAlbumImageModal
  },
  props: {
    albumData: {
      type: Object,
      required: true
    }
  },
  computed: {
    imageData () {
      return this.albumData.image
    }
  },
  methods: {
    handleImageClick () {
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
.album-image
  @extend .cursor-zoom-in, .object-fit-cover
</style>

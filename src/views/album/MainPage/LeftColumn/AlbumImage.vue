<template>
  <div class="main-image-container">
    <BaseImage
      class="rounded bordered album-image"
      :image="imageData.medium"
      @click="handleImageClick"
    />

    <BaseAlbumImageModal
      :image="imageData.original"
      @init="handleModalInit"
    />
  </div>
</template>

<script>
import BaseImage from '@/BaseImage.vue'
import BaseAlbumImageModal from '@/models/album/BaseAlbumImageModal.vue'
import { showModal } from '#/actions/plugins/semantic'

export default {
  name: 'AlbumImage',
  components: {
    BaseImage,
    BaseAlbumImageModal
  },
  props: {
    imageData: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      modal: null
    }
  },
  methods: {
    handleModalInit (el) {
      this.modal = el
    },
    handleImageClick () {
      showModal(this.modal)
    }
  }
}
</script>

<style lang="sass" scoped>
.album-image
  @extend .cursor-zoom-in, .object-fit-cover
</style>

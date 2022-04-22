<template>
  <BaseImageModalContainer
    ref="modal"
  >
    <div class="main-image-modal-content">
      <BaseImage
        class="rounded"
        :image="image"
      />
    </div>
  </BaseImageModalContainer>
</template>

<script>
import BaseImageModalContainer
  from '*/components/containers/modals/BaseImageModalContainer.vue'
import BaseImage from '*/components/images/BaseImage.vue'

export default {
  name: 'BaseAlbumImageModal',
  components: {
    BaseImageModalContainer,
    BaseImage
  },
  props: {
    image: String
  },
  methods: {
    show () {
      this.$refs
        .modal
        .show()
    }
  }
}
</script>

<style lang="sass" scoped>
.main-image-modal-content
  .image
    max-height: $imageModalHeight
    border: $borderInverted
</style>

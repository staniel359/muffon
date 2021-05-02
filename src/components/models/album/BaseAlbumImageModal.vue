<template>
  <BaseImageModalContainer>
    <div class="main-image-modal-content">
      <BaseImage :image="image" />
    </div>
  </BaseImageModalContainer>
</template>

<script>
import BaseImageModalContainer from '@/containers/BaseImageModalContainer.vue'
import BaseImage from '@/BaseImage.vue'

export default {
  name: 'BaseAlbumImageModal',
  components: {
    BaseImageModalContainer,
    BaseImage
  },
  props: {
    image: String
  }
}
</script>

<style lang="sass" scoped>
.main-image-modal-content
  & > .image
    max-height: $imageModalHeight
</style>

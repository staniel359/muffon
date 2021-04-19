<template>
  <BaseImageModalContainer>
    <div class="image-container">
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
.image-container .image
  max-height: $imageModalHeight
</style>

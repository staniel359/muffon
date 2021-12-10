<template>
  <BaseImageModalContainer
    @init="handleInit"
  >
    <div class="main-image-modal-content">
      <BaseImage :image="image" />
    </div>
  </BaseImageModalContainer>
</template>

<script>
import BaseImageModalContainer
  from '@/containers/modals/BaseImageModalContainer.vue'
import BaseImage from '@/images/BaseImage.vue'

export default {
  name: 'BaseAlbumImageModal',
  components: {
    BaseImageModalContainer,
    BaseImage
  },
  props: {
    image: String
  },
  emits: [
    'init'
  ],
  methods: {
    handleInit (el) {
      this.$emit('init', el)
    }
  }
}
</script>

<style lang="sass" scoped>
.main-image-modal-content
  & > .image
    max-height: $imageModalHeight
</style>

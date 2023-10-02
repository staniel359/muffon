<template>
  <BaseImageModalContainer
    ref="modal"
    class="base-image-modal"
  >
    <div class="main-image-modal-content">
      <BaseImage
        :image="image"
        is-bordered
      />
    </div>
  </BaseImageModalContainer>
</template>

<script>
import BaseImageModalContainer
  from '@/components/containers/modals/BaseImageModalContainer.vue'
import BaseImage from '@/components/images/BaseImage.vue'

export default {
  name: 'BaseImageModal',
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

<style lang="sass" scoped></style>

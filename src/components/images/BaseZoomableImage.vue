<template>
  <div class="main-image-container">
    <BaseImage
      :class="imageClass"
      :model="model"
      :image="imageData?.[size]"
      @click="handleImageClick"
    />

    <BaseImageModal
      v-if="imageData"
      ref="modal"
      :image="imageData?.original"
    />
  </div>
</template>

<script>
import BaseImage from '*/components/images/BaseImage.vue'
import BaseImageModal from '*/components/modals/BaseImageModal.vue'

export default {
  name: 'BaseZoomableImage',
  components: {
    BaseImage,
    BaseImageModal
  },
  props: {
    model: {
      type: String,
      required: true
    },
    size: {
      type: String,
      required: true
    },
    imageData: Object,
    isCircular: Boolean
  },
  computed: {
    imageClass () {
      return {
        bordered: true,
        circular: this.isCircular,
        rounded: !this.isCircular,
        'main-zoomable-image': this.imageData
      }
    }
  },
  methods: {
    handleImageClick () {
      if (this.imageData) {
        this.showModal()
      }
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

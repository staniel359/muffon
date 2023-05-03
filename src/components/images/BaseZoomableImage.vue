<template>
  <div
    :class="{
      'main-image-container': isSquareFit
    }"
  >
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
import BaseImage from '@/components/images/BaseImage.vue'
import BaseImageModal from '@/components/modals/BaseImageModal.vue'

export default {
  name: 'BaseZoomableImage',
  components: {
    BaseImage,
    BaseImageModal
  },
  props: {
    size: {
      type: String,
      required: true
    },
    isSquareFit: {
      type: Boolean,
      default: true
    },
    model: String,
    imageData: Object,
    isCircular: Boolean
  },
  computed: {
    imageClass () {
      return {
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

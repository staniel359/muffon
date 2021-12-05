<template>
  <div class="post-images-container">
    <ImageItem
      v-for="imageData in images"
      :key="imageData.uuid"
      :imageData="imageData"
      @deleteButtonClick="handleDeleteButtonClick"
    />
  </div>
</template>

<script>
import ImageItem from './BasePostImagesSection/ImageItem.vue'

export default {
  name: 'BasePostImagesSection',
  components: {
    ImageItem
  },
  props: {
    images: {
      type: Array,
      required: true
    }
  },
  emits: [
    'imagesChange'
  ],
  methods: {
    handleDeleteButtonClick ({ uuid }) {
      const isMatchedImage = imageData => {
        return imageData.uuid !== uuid
      }

      const images = this.images.filter(
        isMatchedImage
      )

      this.$emit(
        'imagesChange',
        images
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.post-images-container
  margin-top: 1em
</style>

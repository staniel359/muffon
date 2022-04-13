<template>
  <div>
    <ImageItem
      v-for="imageData in images"
      :key="imageData.uuid"
      :image-data="imageData"
      @delete-button-click="handleDeleteButtonClick"
    />
  </div>
</template>

<script>
import ImageItem from './BaseFormImagesSection/ImageItem.vue'

export default {
  name: 'BaseFormImagesSection',
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
    handleDeleteButtonClick (
      {
        uuid
      }
    ) {
      function isMatchedImage (
        imageData
      ) {
        return imageData.uuid !== uuid
      }

      const images =
        this.images.filter(
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

<style lang="sass" scoped></style>

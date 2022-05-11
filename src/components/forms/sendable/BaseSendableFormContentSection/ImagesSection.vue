<template>
  <div>
    <ImageItem
      v-for="imageData in images"
      :key="imageData.uuid"
      :image-data="imageData"
    />
  </div>
</template>

<script>
import ImageItem from './ImagesSection/ImageItem.vue'

export default {
  name: 'ImagesSection',
  components: {
    ImageItem
  },
  props: {
    images: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="sass" scoped></style>

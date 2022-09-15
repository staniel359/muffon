<template>
  <div class="ui four column compact grid">
    <ImageItem
      v-for="imageData in images"
      :key="imageData.id"
      :image-data="imageData"
    />
  </div>
</template>

<script>
import ImageItem from './BaseBackgroundImagesTableList/ImageItem.vue'

export default {
  name: 'BaseBackgroundImagesTableList',
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

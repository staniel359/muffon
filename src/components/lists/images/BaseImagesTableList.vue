<template>
  <div class="ui four column grid main-images-table-list">
    <ImageItem
      v-for="imageData in images"
      :key="imageData.id"
      class="column"
      :image-data="imageData"
      :size="size"
      :is-with-clear-button="isWithClearButton"
      :is-clickable="isClickable"
    />
  </div>
</template>

<script>
import ImageItem from './BaseImagesTableList/ImageItem.vue'

export default {
  name: 'BaseImagesTableList',
  components: {
    ImageItem
  },
  props: {
    images: {
      type: Array,
      default () {
        return []
      }
    },
    size: String,
    isWithClearButton: Boolean,
    isClickable: Boolean
  }
}
</script>

<style lang="sass" scoped></style>

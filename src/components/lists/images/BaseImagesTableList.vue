<template>
  <div class="ui four column compact grid">
    <ImageItem
      v-for="imageData in imagesCollection"
      :key="imageData.uuid"
      :image-data="imageData"
    />
  </div>
</template>

<script>
import ImageItem from './BaseImagesTableList/ImageItem.vue'
import {
  collection as formatCollection
} from '@/helpers/formatters'

export default {
  name: 'BaseImagesTableList',
  components: {
    ImageItem
  },
  props: {
    images: {
      type: Array,
      required: true
    }
  },
  computed: {
    imagesCollection () {
      return formatCollection(
        this.images
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>

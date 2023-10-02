<template>
  <div>
    <BaseZoomableImage
      v-for="imageData in imagesCollection"
      :key="imageData.uuid"
      class="main-list-bottom-section media-item"
      size="original"
      :image-data="imageData"
      :is-square-fit="false"
    />
  </div>
</template>

<script>
import BaseZoomableImage from '@/components/images/BaseZoomableImage.vue'
import {
  collection as formatCollection
} from '@/helpers/formatters'

export default {
  name: 'BaseImagesSimpleList',
  components: {
    BaseZoomableImage
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

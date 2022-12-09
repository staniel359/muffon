<template>
  <div>
    <BaseZoomableImage
      v-for="imageData in imagesCollection"
      :key="imageData.uuid"
      class="image-item"
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

<style lang="sass" scoped>
.image-item
  max-width: 420px
  &:not(:first-child)
    margin-top: 0.75em
</style>

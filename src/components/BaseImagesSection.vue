<template>
  <div v-if="images">
    <BaseImage
      v-for="imageData in imagesCollection"
      :key="imageData.uuid"
      :image="imageData.original"
    />
  </div>
</template>

<script>
import BaseImage from '@/images/BaseImage.vue'
import { collection as formatCollection } from '#/formatters'

export default {
  name: 'BaseImagesSection',
  components: {
    BaseImage
  },
  props: {
    images: {
      type: Array,
      default () {
        return []
      }
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
.image
  @extend .d-inline-block
  margin: 0.5em 1em 0.5em 0
</style>

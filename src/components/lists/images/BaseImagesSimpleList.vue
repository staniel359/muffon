<template>
  <div>
    <BaseImage
      v-for="imageData in imagesCollection"
      :key="imageData.uuid"
      class="rounded bordered image-item"
      :image="imageData.original"
    />
  </div>
</template>

<script>
import BaseImage from '@/components/images/BaseImage.vue'
import {
  collection as formatCollection
} from '@/helpers/formatters'

export default {
  name: 'BaseImagesSimpleList',
  components: {
    BaseImage
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
  &:not(:first-child)
    margin-top: 0.75em
</style>

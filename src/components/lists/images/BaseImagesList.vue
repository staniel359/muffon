<template>
  <div>
    <BaseImage
      v-for="imageData in imagesCollection"
      :key="imageData.uuid"
      :image="imageData.original"
    />
  </div>
</template>

<script>
import BaseImage from '*/components/images/BaseImage.vue'
import {
  collection as formatCollection
} from '*/helpers/formatters'

export default {
  name: 'BaseImagesList',
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

<style lang="sass" scoped></style>

<template>
  <template v-if="images">
    <BaseImage
      v-for="imageData in imagesFormatted"
      class="post-image"
      :key="imageData.uuid"
      :image="imageData.original"
    />
  </template>
</template>

<script>
import BaseImage from '@/images/BaseImage.vue'
import { collection as formatCollection } from '#/formatters'

export default {
  name: 'ImagesSection',
  components: {
    BaseImage
  },
  props: {
    postData: {
      type: Object,
      required: true
    }
  },
  computed: {
    images () {
      return this.postData.images
    },
    imagesFormatted () {
      return formatCollection(
        this.images
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.post-image
  margin: 0.5em 0 !important
</style>

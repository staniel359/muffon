<template>
  <div class="ui four column grid">
    <ImageItem
      v-for="(imageData, index) in imagesCollection"
      :key="imageData.uuid"
      class="column"
      :image-data="imageData"
      :index="index"
      @click="handleImageClick"
    />
  </div>
</template>

<script>
import ImageItem from './ImagesList/ImageItem.vue'
import {
  collection as formatCollection
} from '@/helpers/formatters'

export default {
  name: 'ImagesList',
  components: {
    ImageItem
  },
  props: {
    images: {
      type: Array,
      default () {
        return []
      }
    }
  },
  emits: [
    'imageClick'
  ],
  computed: {
    imagesCollection () {
      return formatCollection(
        this.images
      )
    }
  },
  methods: {
    handleImageClick (
      index
    ) {
      this.$emit(
        'imageClick',
        index
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>

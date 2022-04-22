<template>
  <div class="ui four column grid">
    <div
      v-for="(imageData, index) in imagesCollection"
      :key="imageData.uuid"
      class="column"
    >
      <div class="main-image-container">
        <BaseImage
          class="rounded bordered artist-image"
          :image="imageData.small"
          @click="handleImageClick(index)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import BaseImage from '*/components/images/BaseImage.vue'
import {
  collection as formatCollection
} from '*/helpers/formatters'

export default {
  name: 'ImagesList',
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

<style lang="sass" scoped>
.artist-image
  @extend .cursor-zoom-in
</style>

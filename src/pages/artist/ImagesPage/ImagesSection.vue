<template>
  <ImagesList
    :images="images"
    @image-click="handleImageClick"
  />

  <BaseArtistImagesModal
    ref="modal"
    :key="key"
    :images="images"
  />
</template>

<script>
import ImagesList from './ImagesSection/ImagesList.vue'
import BaseArtistImagesModal
  from '@/components/modals/artist/BaseArtistImagesModal.vue'
import {
  generateKey
} from '@/helpers/utils'

export default {
  name: 'ImagesSection',
  components: {
    ImagesList,
    BaseArtistImagesModal
  },
  props: {
    images: Array
  },
  data () {
    return {
      key: null
    }
  },
  watch: {
    images: 'handleImagesChange'
  },
  methods: {
    handleImagesChange () {
      this.key = generateKey()
    },
    handleImageClick (
      index
    ) {
      this.goToSlide(
        index
      )

      this.showModal()
    },
    goToSlide (
      index
    ) {
      this.$refs
        .modal
        .goToSlide(
          index
        )
    },
    showModal () {
      this.$refs
        .modal
        .show()
    }
  }
}
</script>

<style lang="sass" scoped></style>

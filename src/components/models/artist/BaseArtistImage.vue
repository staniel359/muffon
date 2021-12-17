<template>
  <BaseImagePlaceholder v-if="isLoading" />
  <InteractiveImage
    v-else-if="isRenderInteractive"
    :artistName="artistName"
    :images="images"
  />
  <BaseImage
    v-else
    class="artist-image"
    model="artist"
    :image="imageConditional"
  />
</template>

<script>
import BaseImagePlaceholder from '@/images/BaseImagePlaceholder.vue'
import InteractiveImage from './BaseArtistImage/InteractiveImage.vue'
import BaseImage from '@/images/BaseImage.vue'
import getArtistImage from '#/actions/api/artist/image/get'
import { defaultImages as formatDefaultImages } from '#/formatters/artist'

export default {
  name: 'BaseArtistImage',
  components: {
    BaseImagePlaceholder,
    InteractiveImage,
    BaseImage
  },
  props: {
    size: {
      type: String,
      required: true
    },
    imageData: Object,
    artistName: String,
    isInteractive: Boolean
  },
  emits: [
    'loadEnd'
  ],
  data () {
    return {
      error: null,
      images: null,
      isLoading: false
    }
  },
  computed: {
    isRenderInteractive () {
      return (
        this.isInteractive &&
          this.isAnyImages
      )
    },
    isAnyImages () {
      return this.images?.length
    },
    imageFetched () {
      return this.imagesConditional[0]
    },
    imagesConditional () {
      if (this.isAnyImages) {
        return this.images
      } else {
        return formatDefaultImages()
      }
    },
    artistImageArgs () {
      return {
        artistName: this.artistName,
        isInteractive: this.isInteractive,
        limit: 20
      }
    },
    imageConditional () {
      return (
        this.imageData ||
          this.imageFetched
      )[this.size]
    }
  },
  watch: {
    artistName: {
      immediate: true,
      handler: 'handleArtistNameChange'
    },
    imageFetched: 'handleImageFetchedChange'
  },
  methods: {
    handleArtistNameChange (newValue, oldValue) {
      const isNewArtist =
        this.isArtistNameChanged(
          newValue, oldValue
        )

      if (
        !this.imageData &&
          isNewArtist
      ) {
        this.fetchData()
      }
    },
    handleImageFetchedChange (value) {
      this.$emit(
        'loadEnd',
        value
      )
    },
    isArtistNameChanged (newValue, oldValue) {
      return (
        this.formatArtistName(newValue) !==
          this.formatArtistName(oldValue)
      )
    },
    formatArtistName (value) {
      return value?.trim()?.toLowerCase()
    },
    getArtistImage,
    fetchData () {
      this.getArtistImage(
        this.artistImageArgs
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.artist-image
  @extend .object-fit-cover
</style>

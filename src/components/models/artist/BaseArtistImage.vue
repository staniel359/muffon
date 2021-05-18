<template>
  <BaseImagePlaceholder v-if="isLoading" />
  <InteractiveImage
    v-else-if="isRenderInteractive"
    :artistName="artistName"
    :images="images"
  />
  <BaseImage
    v-else
    :image="image"
  />
</template>

<script>
import BaseImagePlaceholder from '@/BaseImagePlaceholder.vue'
import InteractiveImage from './BaseArtistImage/InteractiveImage.vue'
import BaseImage from '@/BaseImage.vue'
import fetchArtistImageData from '#/actions/api/artist/image/fetchData'
import { defaultImages as formatDefaultImages } from '#/formatters/artist'

export default {
  name: 'BaseArtistImage',
  components: {
    BaseImagePlaceholder,
    InteractiveImage,
    BaseImage
  },
  props: {
    artistName: {
      type: String,
      required: true
    },
    size: {
      type: String,
      required: true
    },
    isVisible: {
      type: Boolean,
      default: true
    },
    isInteractive: Boolean
  },
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
    image () {
      return this.imagesFormatted[0][this.size]
    },
    imagesFormatted () {
      if (this.isAnyImages) {
        return this.images
      } else {
        return formatDefaultImages()
      }
    },
    artistImageDataArgs () {
      return {
        artistName: this.artistName,
        isInteractive: this.isInteractive
      }
    }
  },
  watch: {
    artistName: {
      immediate: true,
      handler: 'handleArtistNameChange'
    },
    isVisible: 'handleIsVisibleChange'
  },
  methods: {
    handleArtistNameChange (newValue, oldValue) {
      const isNewArtist = this.isArtistNameChanged(
        newValue, oldValue
      )

      if (this.isVisible && isNewArtist) {
        this.fetchData()
      }
    },
    handleIsVisibleChange (value) {
      value && this.fetchData()
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
    fetchArtistImageData,
    fetchData () {
      this.fetchArtistImageData(
        this.artistImageDataArgs
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>

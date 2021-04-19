<template>
  <InteractiveImage
    v-if="isRenderInteractive"
    v-bind="$attrs"
    :artistName="artistName"
    :images="images"
    :isRounded="isRounded"
    :isCircular="isCircular"
    :isBordered="isBordered"
    :size="size"
  />
  <BaseImage
    v-else
    v-bind="$attrs"
    :image="image"
    :isLoading="isLoading"
    :isRounded="isRounded"
    :isCircular="isCircular"
    :isBordered="isBordered"
  />
</template>

<script>
import InteractiveImage from './BaseArtistImage/InteractiveImage.vue'
import BaseImage from '@/BaseImage.vue'
import fetchArtistImageData from '#/actions/api/artist/image/fetchData'
import { defaultImages as formatDefaultImages } from '#/formatters/artist'

export default {
  name: 'BaseArtistImage',
  components: {
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
    isInteractive: Boolean,
    isRounded: Boolean,
    isCircular: Boolean,
    isBordered: Boolean
  },
  data () {
    return {
      isLoading: false,
      error: null,
      images: null
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
    }
  },
  methods: {
    handleArtistNameChange () {
      this.fetchData()
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

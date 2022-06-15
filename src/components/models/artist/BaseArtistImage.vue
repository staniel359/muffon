<template>
  <BaseImagePlaceholder
    v-if="isLoading"
    :class="imageClass"
  />
  <InteractiveImage
    v-else-if="isRenderInteractive"
    :class="imageClass"
    :image-data="responseImageData"
    :images="responseImages"
    :artist-name="artistName"
  />
  <BaseZoomableImage
    v-else-if="isZoomable"
    model="artist"
    :image-data="imageDataComputed"
    :size="size"
    :is-circular="isCircular"
  />
  <BaseImage
    v-else
    :class="imageClass"
    model="artist"
    :image="imageComputed"
  />
</template>

<script>
import BaseImagePlaceholder from '*/components/images/BaseImagePlaceholder.vue'
import InteractiveImage from './BaseArtistImage/InteractiveImage.vue'
import BaseZoomableImage from '*/components/images/BaseZoomableImage.vue'
import BaseImage from '*/components/images/BaseImage.vue'
import getArtist from '*/helpers/actions/api/artist/get'

export default {
  name: 'BaseArtistImage',
  components: {
    BaseImagePlaceholder,
    InteractiveImage,
    BaseZoomableImage,
    BaseImage
  },
  props: {
    size: {
      type: String,
      required: true
    },
    isCircular: {
      type: Boolean,
      default: true
    },
    imageData: Object,
    artistName: String,
    isInteractive: Boolean,
    isZoomable: Boolean
  },
  emits: [
    'loadEnd'
  ],
  data () {
    return {
      artistData: null,
      isLoading: false
    }
  },
  computed: {
    isRenderInteractive () {
      return (
        this.isInteractive &&
          this.responseImageData &&
          this.responseImages?.length
      )
    },
    responseImageData () {
      return this.artistData?.image
    },
    responseImages () {
      return this.artistData?.images
    },
    artistImageArgs () {
      return {
        artistName: this.artistName,
        scope: this.scope,
        update: this.isInteractive
      }
    },
    scope () {
      if (this.isInteractive) {
        return 'images'
      } else {
        return 'image'
      }
    },
    imageComputed () {
      return this.imageDataComputed?.[
        this.size
      ]
    },
    imageDataComputed () {
      return (
        this.imageData ||
          this.responseImageData
      )
    },
    imageClass () {
      return {
        bordered: true,
        circular: this.isCircular,
        rounded: !this.isCircular
      }
    }
  },
  watch: {
    artistName: {
      immediate: true,
      handler: 'handleArtistNameChange'
    },
    responseImageData:
      'handleResponseImageDataChange'
  },
  methods: {
    getArtist,
    handleArtistNameChange (
      newValue,
      oldValue
    ) {
      const isNewArtist =
        this.isArtistNameChanged(
          newValue,
          oldValue
        )

      const isGetImage = (
        !this.imageData &&
          isNewArtist
      )

      if (isGetImage) {
        this.getData()
      }
    },
    handleResponseImageDataChange (
      value
    ) {
      this.$emit(
        'loadEnd',
        value
      )
    },
    isArtistNameChanged (
      newValue,
      oldValue
    ) {
      return (
        this.formatArtistName(
          newValue
        ) !==
          this.formatArtistName(
            oldValue
          )
      )
    },
    formatArtistName (
      value
    ) {
      return value?.trim()?.toLowerCase()
    },
    getData () {
      this.getArtist(
        this.artistImageArgs
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>

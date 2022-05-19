<template>
  <BaseImagePlaceholder
    v-if="isLoading"
  />
  <InteractiveImage
    v-else-if="isRenderInteractive"
    :artist-name="artistName"
    :images="responseImages"
    :image-data="responseImage"
  />
  <BaseImage
    v-else
    class="artist-image"
    model="artist"
    :image="imageConditional"
  />
</template>

<script>
import BaseImagePlaceholder from '*/components/images/BaseImagePlaceholder.vue'
import InteractiveImage from './BaseArtistImage/InteractiveImage.vue'
import BaseImage from '*/components/images/BaseImage.vue'
import getArtist from '*/helpers/actions/api/artist/get'

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
      artistData: null,
      isLoading: false
    }
  },
  computed: {
    isRenderInteractive () {
      return (
        this.isInteractive &&
          this.responseImage &&
          this.responseImages?.length
      )
    },
    responseImage () {
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
    imageConditional () {
      return (
        this.imageData ||
          this.responseImage
      )?.[this.size]
    }
  },
  watch: {
    artistName: {
      immediate: true,
      handler: 'handleArtistNameChange'
    },
    responseImage: 'handleResponseImageChange'
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
    handleResponseImageChange (
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

<style lang="sass" scoped>
.artist-image
  @extend .object-fit-cover
</style>

<template>
  <BaseImagePlaceholder
    v-if="isLoading"
  />
  <InteractiveImage
    v-else-if="isRenderInteractive"
    :artist-name="artistName"
    :images="imagesFetched"
    :image-data="imageFetched"
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
          this.imageFetched &&
          this.imagesFetched?.length
      )
    },
    imageFetched () {
      return this.artistData?.image
    },
    imagesFetched () {
      return this.artistData?.images
    },
    artistImageArgs () {
      return {
        artistName: this.artistName,
        scope: this.scope
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
          this.imageFetched
      )?.[this.size]
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

      const isFetchImage = (
        !this.imageData &&
          isNewArtist
      )

      if (isFetchImage) {
        this.fetchData()
      }
    },
    handleImageFetchedChange (
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
    fetchData () {
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

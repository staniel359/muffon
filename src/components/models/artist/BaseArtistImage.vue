<template>
  <BaseImagePlaceholder
    v-if="isLoading"
  />
  <InteractiveImage
    v-else-if="isRenderInteractive"
    :artistName="artistName"
    :images="images"
    :imageData="image"
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
      image: null,
      images: null,
      isLoading: false
    }
  },
  computed: {
    isRenderInteractive () {
      return (
        this.isInteractive &&
          this.image &&
          this.images?.length
      )
    },
    artistImageArgs () {
      return {
        artistName: this.artistName,
        isInteractive: this.isInteractive
      }
    },
    imageConditional () {
      return (
        this.imageData ||
          this.image
      )?.[this.size]
    }
  },
  watch: {
    artistName: {
      immediate: true,
      handler: 'handleArtistNameChange'
    },
    image: 'handleImageChange'
  },
  methods: {
    handleArtistNameChange (newValue, oldValue) {
      const isNewArtist =
        this.isArtistNameChanged(
          newValue, oldValue
        )

      const isFetchImage = (
        !this.imageData &&
          isNewArtist
      )

      if (isFetchImage) {
        this.fetchData()
      }
    },
    handleImageChange (value) {
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

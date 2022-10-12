<template>
  <div class="left-column">
    <BaseArtistImage
      class="artist-image"
      size="medium"
      :image-data="imageData"
      :artist-name="artistName"
    />

    <SelfSection
      :artist-data="artistData"
    />
  </div>
</template>

<script>
import BaseArtistImage from '@/components/models/artist/BaseArtistImage.vue'
import SelfSection from './LeftColumn/SelfSection.vue'

export default {
  name: 'LeftColumn',
  components: {
    BaseArtistImage,
    SelfSection
  },
  props: {
    artistData: {
      type: Object,
      required: true
    }
  },
  computed: {
    imageData () {
      return this.artistData.image
    },
    artistName () {
      return this.artistData.name
    }
  }
}
</script>

<style lang="sass" scoped>
.artist-image
  width: 110px
  height: 110px
</style>

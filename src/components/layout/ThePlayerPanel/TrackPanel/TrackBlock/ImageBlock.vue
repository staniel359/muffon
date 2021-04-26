<template>
  <BaseImage
    v-if="image"
    class="track-image"
    :image="image"
    isRounded
    isBordered
  />
  <BaseArtistImage
    v-else
    class="track-image"
    size="extrasmall"
    :artistName="artistName"
    isCircular
    isBordered
  />
</template>

<script>
import BaseImage from '@/BaseImage.vue'
import BaseArtistImage from '@/models/artist/BaseArtistImage.vue'

export default {
  name: 'ImageBlock',
  components: {
    BaseImage,
    BaseArtistImage
  },
  props: {
    image: String,
    artistName: String
  }
}
</script>

<style lang="sass" scoped>
.track-image
  width: 40px
  height: 40px
  margin-right: 10px !important
</style>

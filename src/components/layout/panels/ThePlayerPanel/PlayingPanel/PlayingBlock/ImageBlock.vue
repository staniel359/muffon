<template>
  <BaseImage
    v-if="image"
    class="rounded bordered track-image"
    :image="image"
  />
  <BaseArtistImage
    v-else
    class="circular bordered track-image"
    size="extrasmall"
    :artistName="artistName"
  />
</template>

<script>
import BaseImage from '@/images/BaseImage.vue'
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
  margin-right: 0.5em !important
</style>

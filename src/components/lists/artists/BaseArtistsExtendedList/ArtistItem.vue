<template>
  <div class="card artist-item">
    <div class="content">
      <BaseImage
        class="artist-image"
        :image="image"
        isCircular
        isBordered
      />

      <InfoBlock :artistData="artistData" />
    </div>
  </div>
</template>

<script>
import BaseImage from '@/BaseImage.vue'
import InfoBlock from './ArtistItem/InfoBlock.vue'

export default {
  name: 'ArtistItem',
  components: {
    BaseImage,
    InfoBlock
  },
  props: {
    artistData: {
      type: Object,
      required: true
    }
  },
  computed: {
    image () {
      return this.artistData.image.small
    }
  }
}
</script>

<style lang="sass" scoped>
.artist-item
  @extend .w-100

.content
  @extend .d-flex

.artist-image
  width: 150px
  height: 150px
  margin-right: 1em
</style>

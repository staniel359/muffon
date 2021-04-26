<template>
  <BaseHorizontalCardContainer>
    <BaseImage
      class="artist-image"
      :image="image"
      isCircular
      isBordered
    />

    <InfoBlock :artistData="artistData" />
  </BaseHorizontalCardContainer>
</template>

<script>
import BaseHorizontalCardContainer
  from '@/containers/BaseHorizontalCardContainer.vue'
import BaseImage from '@/BaseImage.vue'
import InfoBlock from './ArtistItem/InfoBlock.vue'

export default {
  name: 'ArtistItem',
  components: {
    BaseHorizontalCardContainer,
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
.artist-image
  width: 150px
  height: 150px
  margin-right: 1em
</style>

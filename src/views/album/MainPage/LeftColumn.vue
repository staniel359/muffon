<template>
  <div class="left-column">
    <AlbumImage :imageData="imageData" />

    <AlbumHeader
      :albumTitle="albumTitle"
      :artistName="artistName"
      :scrollable="scrollable"
    />
  </div>
</template>

<script>
import AlbumImage from './LeftColumn/AlbumImage.vue'
import AlbumHeader from './LeftColumn/AlbumHeader.vue'

export default {
  name: 'LeftColumn',
  components: {
    AlbumImage,
    AlbumHeader
  },
  props: {
    albumData: {
      type: Object,
      required: true
    },
    scrollable: HTMLDivElement
  },
  computed: {
    imageData () {
      return this.albumData.image
    },
    albumTitle () {
      return this.albumData.title
    },
    artistName () {
      return this.albumData.artist.name
    }
  }
}
</script>

<style lang="sass" scoped>
.left-column
  @extend .sticky
  width: 210px
  margin-right: 1em
  top: calc(#{$mainContainerTopPadding})
  align-self: flex-start
</style>

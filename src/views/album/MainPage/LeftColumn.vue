<template>
  <div class="left-column">
    <AlbumImage :imageData="imageData" />

    <AlbumHeader
      :albumTitle="albumTitle"
      :artistName="artistName"
      :scrollable="scrollable"
    />

    <AlbumSourceSelect
      :albumTitle="albumTitle"
      :artistName="artistName"
    />
  </div>
</template>

<script>
import AlbumImage from './LeftColumn/AlbumImage.vue'
import AlbumHeader from './LeftColumn/AlbumHeader.vue'
import AlbumSourceSelect from './LeftColumn/AlbumSourceSelect.vue'

export default {
  name: 'LeftColumn',
  components: {
    AlbumImage,
    AlbumHeader,
    AlbumSourceSelect
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
  width: 200px
  margin-right: 1em
  top: calc(#{$mainContainerTopPadding} + 1em)
  align-self: flex-start
</style>

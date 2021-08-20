<template>
  <div class="album-page-left-column main-sticky-container">
    <AlbumImage
      :imageData="imageData"
    />

    <AlbumHeader
      :albumTitle="albumTitle"
      :artistName="artistName"
      :scrollable="scrollable"
    />

    <BaseProfileLibraryButton
      class="library-button"
      model="album"
      :modelId="libraryId"
      :profileId="profileId"
      :artistName="artistName"
      :albumTitle="albumTitle"
      :albumTracks="tracks"
      :albumImageUrl="image"
    />
  </div>
</template>

<script>
import AlbumImage from './LeftColumn/AlbumImage.vue'
import AlbumHeader from './LeftColumn/AlbumHeader.vue'
import BaseProfileLibraryButton from '@/BaseProfileLibraryButton.vue'

export default {
  name: 'LeftColumn',
  components: {
    AlbumImage,
    AlbumHeader,
    BaseProfileLibraryButton
  },
  props: {
    albumData: {
      type: Object,
      required: true
    },
    scrollable: HTMLDivElement,
    profileId: String
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
    },
    libraryId () {
      return this.albumData.library_id?.toString()
    },
    tracks () {
      return this.albumData.tracks
    },
    image () {
      return this.albumData.image.medium
    }
  }
}
</script>

<style lang="sass" scoped>
.album-page-left-column
  width: 200px

.library-button
  margin-top: 1em
</style>

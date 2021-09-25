<template>
  <div class="album-page-left-column main-sticky-container">
    <AlbumImage
      :imageData="imageData"
    />

    <div class="left-column-extra">
      <AlbumHeader
        :albumTitle="albumTitle"
        :artistName="artistName"
        :scrollable="scrollable"
      />

      <BaseSelfButtons
        model="album"
        :libraryId="libraryId"
        :favoriteId="favoriteId"
        :bookmarkId="bookmarkId"
        :listenedId="listenedId"
        :artistName="artistName"
        :albumTitle="albumTitle"
        :albumTracks="tracks"
        :imageUrl="image"
      />
    </div>
  </div>
</template>

<script>
import AlbumImage from './LeftColumn/AlbumImage.vue'
import AlbumHeader from './LeftColumn/AlbumHeader.vue'
import BaseSelfButtons from '@/models/self/BaseSelfButtons.vue'

export default {
  name: 'LeftColumn',
  components: {
    AlbumImage,
    AlbumHeader,
    BaseSelfButtons
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
    },
    libraryId () {
      return this.albumData.library_id?.toString()
    },
    tracks () {
      return this.albumData.tracks
    },
    image () {
      return this.albumData.image.medium
    },
    listenedId () {
      return this.albumData.listened_id?.toString()
    },
    bookmarkId () {
      return this.albumData.bookmark_id?.toString()
    },
    favoriteId () {
      return this.albumData.favorite_id?.toString()
    }
  }
}
</script>

<style lang="sass" scoped>
.album-page-left-column
  width: 190px

.left-column-extra
  margin-top: 0.5em
</style>

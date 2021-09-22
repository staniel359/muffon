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

    <div class="main-self-buttons">
      <BaseLibraryButton
        class="main-self-button"
        model="album"
        :modelId="libraryId"
        :artistName="artistName"
        :albumTitle="albumTitle"
        :albumTracks="tracks"
        :imageUrl="image"
      />

      <BaseListenedButton
        class="main-self-button"
        model="album"
        :modelId="listenedId"
        :artistName="artistName"
        :albumTitle="albumTitle"
        :imageUrl="image"
      />

      <BaseBookmarkButton
        class="main-self-button"
        model="album"
        :modelId="bookmarkId"
        :artistName="artistName"
        :albumTitle="albumTitle"
        :imageUrl="image"
      />
    </div>
  </div>
</template>

<script>
import AlbumImage from './LeftColumn/AlbumImage.vue'
import AlbumHeader from './LeftColumn/AlbumHeader.vue'
import BaseLibraryButton from '@/models/self/BaseLibraryButton.vue'
import BaseListenedButton from '@/models/self/BaseListenedButton.vue'
import BaseBookmarkButton from '@/models/self/BaseBookmarkButton.vue'

export default {
  name: 'LeftColumn',
  components: {
    AlbumImage,
    AlbumHeader,
    BaseLibraryButton,
    BaseListenedButton,
    BaseBookmarkButton
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
    }
  }
}
</script>

<style lang="sass" scoped>
.album-page-left-column
  width: 200px
</style>

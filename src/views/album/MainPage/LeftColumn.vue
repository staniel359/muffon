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

      <div class="main-self-container">
        <BaseSelfIcons
          :libraryId="libraryId"
          :favoriteId="favoriteId"
          :bookmarkId="bookmarkId"
          :listenedId="listenedId"
        />

        <BaseOptionsDropdown
          model="album"
          :modelId="albumId"
          :libraryId="libraryId"
          :favoriteId="favoriteId"
          :bookmarkId="bookmarkId"
          :listenedId="listenedId"
          :albumTracks="tracks"
          :imageUrl="imageData.medium"
          isWithLibraryOption
          isWithFavoriteOption
          isWithBookmarkOption
          isWithListenedOption
        />
      </div>
    </div>
  </div>
</template>

<script>
import AlbumImage from './LeftColumn/AlbumImage.vue'
import AlbumHeader from './LeftColumn/AlbumHeader.vue'
import BaseSelfIcons from '@/models/self/BaseSelfIcons.vue'
import BaseOptionsDropdown from '@/BaseOptionsDropdown.vue'

export default {
  name: 'LeftColumn',
  components: {
    AlbumImage,
    AlbumHeader,
    BaseSelfIcons,
    BaseOptionsDropdown
  },
  provide () {
    return {
      setLibraryId: this.setLibraryId,
      setFavoriteId: this.setFavoriteId,
      setBookmarkId: this.setBookmarkId,
      setListenedId: this.setListenedId
    }
  },
  props: {
    albumData: {
      type: Object,
      required: true
    },
    scrollable: HTMLDivElement
  },
  data () {
    return {
      libraryId: null,
      favoriteId: null,
      bookmarkId: null,
      listenedId: null
    }
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
    tracks () {
      return this.albumData.tracks
    },
    albumId () {
      return this.albumData.id.toString()
    }
  },
  mounted () {
    this.libraryId =
      this.albumData.library_id?.toString()
    this.favoriteId =
      this.albumData.favorite_id?.toString()
    this.bookmarkId =
      this.albumData.bookmark_id?.toString()
    this.listenedId =
      this.albumData.listened_id?.toString()
  },
  methods: {
    setLibraryId (value) {
      this.libraryId = value
    },
    setFavoriteId (value) {
      this.favoriteId = value
    },
    setBookmarkId (value) {
      this.bookmarkId = value
    },
    setListenedId (value) {
      this.listenedId = value
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

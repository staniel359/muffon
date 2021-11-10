<template>
  <div class="track-page-left-column main-sticky-container">
    <div class="main-image-container">
      <BaseImage
        class="rounded bordered track-image"
        :image="imageData.medium"
      />
    </div>

    <div class="left-column-extra">
      <TrackHeader
        :trackData="trackData"
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
          model="track"
          :trackTitle="trackTitle"
          :artistName="artistName"
          :albumTitle="albumTitle"
          :imageUrl="imageData.medium"
          :libraryId="libraryId"
          :favoriteId="favoriteId"
          :bookmarkId="bookmarkId"
          :listenedId="listenedId"
          isWithLibraryOption
          isWithFavoriteOption
          isWithBookmarkOption
          isWithListenedOption
          isWithPlaylistOption
          @playlist="handlePlaylistOptionClick"
        />
      </div>

      <BasePlaylistsModal
        ref="playlistModal"
        :trackTitle="trackTitle"
        :artistName="artistName"
        :albumTitle="albumTitle"
        :imageUrl="imageData.medium"
      />
    </div>
  </div>
</template>

<script>
import BaseImage from '@/BaseImage.vue'
import TrackHeader from './LeftColumn/TrackHeader.vue'
import BaseSelfIcons from '@/models/self/BaseSelfIcons.vue'
import BaseOptionsDropdown from '@/BaseOptionsDropdown.vue'
import BasePlaylistsModal from '@/BasePlaylistsModal.vue'

export default {
  name: 'LeftColumn',
  components: {
    BaseImage,
    TrackHeader,
    BaseSelfIcons,
    BaseOptionsDropdown,
    BasePlaylistsModal
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
    trackData: {
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
      return this.trackData.image
    },
    trackTitle () {
      return this.trackData.title
    },
    artistName () {
      return this.trackData.artist.name
    },
    albumTitle () {
      return this.trackData.album?.title
    }
  },
  mounted () {
    this.libraryId =
      this.trackData.library_id?.toString()
    this.favoriteId =
      this.trackData.favorite_id?.toString()
    this.bookmarkId =
      this.trackData.bookmark_id?.toString()
    this.listenedId =
      this.trackData.listened_id?.toString()
  },
  methods: {
    handlePlaylistOptionClick () {
      this.$refs.playlistModal.show()
    },
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
.track-page-left-column
  width: 150px

.left-column-extra
  margin-top: 0.5em
</style>

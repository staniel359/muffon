<template>
  <div class="album-page-left-column main-sticky-container">
    <ImageSection
      :album-data="albumData"
    />

    <div class="left-column-extra">
      <HeaderSection
        :album-data="albumData"
        :scrollable="scrollable"
      />

      <SelfSection
        :album-data="albumData"
        :library-id="libraryId"
        :favorite-id="favoriteId"
        :bookmark-id="bookmarkId"
        :listened-id="listenedId"
      />
    </div>
  </div>
</template>

<script>
import ImageSection from './LeftColumn/ImageSection.vue'
import HeaderSection from './LeftColumn/HeaderSection.vue'
import SelfSection from './LeftColumn/SelfSection.vue'

export default {
  name: 'LeftColumn',
  components: {
    ImageSection,
    HeaderSection,
    SelfSection
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
  watch: {
    albumData: {
      immediate: true,
      handler: 'handleAlbumDataChange'
    }
  },
  methods: {
    handleAlbumDataChange () {
      this.libraryId =
        this.albumData.library_id?.toString()
      this.favoriteId =
        this.albumData.favorite_id?.toString()
      this.bookmarkId =
        this.albumData.bookmark_id?.toString()
      this.listenedId =
        this.albumData.listened_id?.toString()
    },
    setLibraryId (
      value
    ) {
      this.libraryId = value
    },
    setFavoriteId (
      value
    ) {
      this.favoriteId = value
    },
    setBookmarkId (
      value
    ) {
      this.bookmarkId = value
    },
    setListenedId (
      value
    ) {
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

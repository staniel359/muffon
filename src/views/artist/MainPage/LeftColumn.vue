<template>
  <div
    :class="[
      'ui segments',
      'artist-page-left-column',
      'main-sticky-container'
    ]"
  >
    <ImageNameSegment
      :artist-name="artistName"
      :scrollable="scrollable"
    />

    <SelfSegment
      :artist-name="artistName"
      :library-id="libraryId"
      :favorite-id="favoriteId"
      :bookmark-id="bookmarkId"
      :listened-id="listenedId"
    />

    <RecommendedSegment
      v-if="recommendationData"
      :recommendation-data="recommendationData"
    />
  </div>
</template>

<script>
import ImageNameSegment from './LeftColumn/ImageNameSegment.vue'
import SelfSegment from './LeftColumn/SelfSegment.vue'
import RecommendedSegment from './LeftColumn/RecommendedSegment.vue'

export default {
  name: 'LeftColumn',
  components: {
    ImageNameSegment,
    SelfSegment,
    RecommendedSegment
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
    artistData: {
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
    artistName () {
      return this.artistData.name
    },
    recommendationData () {
      return this.artistData.recommendation
    }
  },
  mounted () {
    this.libraryId =
      this.artistData.library_id?.toString()
    this.favoriteId =
      this.artistData.favorite_id?.toString()
    this.bookmarkId =
      this.artistData.bookmark_id?.toString()
    this.listenedId =
      this.artistData.listened_id?.toString()
  },
  methods: {
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
.artist-page-left-column
  width: 200px
</style>

<template>
  <div class="track-page-left-column main-sticky-container">
    <ImageSection
      :trackData="trackData"
    />

    <div class="left-column-extra">
      <HeaderSection
        :trackData="trackData"
        :scrollable="scrollable"
      />

      <SelfSection
        :trackData="trackData"
        :libraryId="libraryId"
        :favoriteId="favoriteId"
        :bookmarkId="bookmarkId"
        :listenedId="listenedId"
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
  watch: {
    trackData: {
      immediate: true,
      handler: 'handleTrackDataChange'
    }
  },
  methods: {
    handleTrackDataChange () {
      this.libraryId =
        this.trackData.library_id?.toString()
      this.favoriteId =
        this.trackData.favorite_id?.toString()
      this.bookmarkId =
        this.trackData.bookmark_id?.toString()
      this.listenedId =
        this.trackData.listened_id?.toString()
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

.main-self-icons
  @extend .text-align-center
  max-width: 80px
</style>

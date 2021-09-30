<template>
  <div class="artist-page-left-column main-sticky-container">
    <div class="main-image-container">
      <BaseArtistImage
        class="rounded image-content"
        size="medium"
        :artistName="artistName"
        isInteractive
      />
    </div>

    <div class="left-column-extra">
      <BaseTransitionContainer
        class="artist-name transition hidden"
        :scrollable="scrollable"
      >
        <BaseHeader
          tag="h3"
          :text="artistName"
        />
      </BaseTransitionContainer>

      <BaseSelfIcons
        :libraryId="libraryId"
        :favoriteId="favoriteId"
        :bookmarkId="bookmarkId"
        :listenedId="listenedId"
      />

      <div class="main-options-dropdown-container-right">
        <BaseOptionsDropdown
          model="artist"
          :modelId="artistId"
          :libraryId="libraryId"
          :favoriteId="favoriteId"
          :bookmarkId="bookmarkId"
          :listenedId="listenedId"
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
import BaseArtistImage from '@/models/artist/BaseArtistImage.vue'
import BaseTransitionContainer from '@/containers/BaseTransitionContainer.vue'
import BaseHeader from '@/BaseHeader.vue'
import BaseSelfIcons from '@/models/self/BaseSelfIcons.vue'
import BaseOptionsDropdown from '@/BaseOptionsDropdown.vue'

export default {
  name: 'LeftColumn',
  components: {
    BaseArtistImage,
    BaseTransitionContainer,
    BaseHeader,
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
    artistId () {
      return this.artistData.id.toString()
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
.artist-page-left-column
  width: 200px

.left-column-extra
  margin-top: 0.5em

.artist-name
  @extend .text-align-center
  .ui.header
    @extend .text-color-white

.main-self-icons
  @extend .text-align-center
  margin-top: 0.25em
</style>

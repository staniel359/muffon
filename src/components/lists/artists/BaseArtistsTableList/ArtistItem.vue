<template>
  <BaseArtistLinkContainer
    :artist-data="artistData"
    :profile-id="profileId"
    :is-link-to-library="isLinkToLibrary"
    :is-tracks-active="isTracksActive"
    :is-albums-active="isAlbumsActive"
    @click="handleLinkClick"
  >
    <BaseSimpleCardContainer
      :is-with-image="false"
    >
      <div class="main-simple-card-image-container">
        <BaseArtistImage
          class="circular bordered"
          size="small"
          :image-data="imageData"
          :artist-name="artistName"
          @load-end="handleImageLoadEnd"
        />
      </div>

      <BaseOptionsDropdown
        model="artist"
        :artist-name="artistName"
        :library-id="libraryId"
        :favorite-id="favoriteId"
        :bookmark-id="bookmarkId"
        :listened-id="listenedId"
        :is-with-library-option="isWithLibraryOption"
        :is-with-favorite-option="isWithFavoriteOption"
        :is-with-bookmark-option="isWithBookmarkOption"
        :is-with-listened-option="isWithListenedOption"
        :is-with-delete-option="isWithDeleteOption"
        :is-transparent="false"
        @link-click="handleLinkClick"
      />

      <div class="content">
        <BaseHeader
          :class="{
            link: isHeaderActive
          }"
          tag="h4"
          :text="artistName"
        />

        <BaseArtistListenersCount
          v-if="isWithListenersCount"
          class="description"
          :artist-name="artistName"
          :listeners-count="listenersCount"
          @load-end="handleListenersCountLoadEnd"
        />

        <LibraryCountersSection
          v-if="isWithLibrary"
          :artist-data="artistData"
          :is-tracks-active="isTracksActive"
          :is-albums-active="isAlbumsActive"
          @tracks-active-change="handleTracksActiveChange"
          @albums-active-change="handleAlbumsActiveChange"
        />

        <BaseSelfIcons
          v-if="isWithSelfIcons"
          :library-id="libraryId"
          :favorite-id="favoriteId"
          :bookmark-id="bookmarkId"
          :listened-id="listenedId"
        />
      </div>
    </BaseSimpleCardContainer>
  </BaseArtistLinkContainer>
</template>

<script>
import BaseArtistLinkContainer
  from '*/components/containers/artist/BaseArtistLinkContainer.vue'
import BaseSimpleCardContainer
  from '*/components/containers/BaseSimpleCardContainer.vue'
import BaseArtistImage from '*/components/models/artist/BaseArtistImage.vue'
import BaseOptionsDropdown
  from '*/components/dropdowns/BaseOptionsDropdown.vue'
import BaseHeader from '*/components/BaseHeader.vue'
import BaseArtistListenersCount
  from '*/components/models/artist/BaseArtistListenersCount.vue'
import LibraryCountersSection from './ArtistItem/LibraryCountersSection.vue'
import BaseSelfIcons from '*/components/models/self/BaseSelfIcons.vue'

export default {
  name: 'ArtistItem',
  components: {
    BaseArtistLinkContainer,
    BaseSimpleCardContainer,
    BaseArtistImage,
    BaseOptionsDropdown,
    BaseHeader,
    BaseArtistListenersCount,
    LibraryCountersSection,
    BaseSelfIcons
  },
  provide () {
    return {
      setLibraryId: this.setLibraryId,
      setFavoriteId: this.setFavoriteId,
      setBookmarkId: this.setBookmarkId,
      setListenedId: this.setListenedId
    }
  },
  inject: [
    'findPaginationItem'
  ],
  props: {
    artistData: {
      type: Object,
      required: true
    },
    isWithSelfIcons: {
      type: Boolean,
      default: true
    },
    isWithListenersCount: Boolean,
    isWithLibrary: Boolean,
    isLinkToLibrary: Boolean,
    profileId: String,
    isWithLibraryOption: Boolean,
    isWithFavoriteOption: Boolean,
    isWithBookmarkOption: Boolean,
    isWithListenedOption: Boolean,
    isWithDeleteOption: Boolean
  },
  emits: [
    'linkClick'
  ],
  data () {
    return {
      isTracksActive: false,
      isAlbumsActive: false,
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
    imageData () {
      return this.artistData.image
    },
    listenersCount () {
      return this.artistData.listeners_count
    },
    isHeaderActive () {
      return !(
        this.isTracksActive ||
          this.isAlbumsActive
      )
    },
    paginationItem () {
      return this.findPaginationItem(
        {
          uuid: this.uuid
        }
      )
    },
    uuid () {
      return this.artistData.uuid
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
    handleLinkClick () {
      this.$emit(
        'linkClick'
      )
    },
    handleImageLoadEnd (
      value
    ) {
      this.paginationItem
        .image = value
    },
    handleListenersCountLoadEnd (
      value
    ) {
      this.paginationItem
        .listeners_count = value
    },
    handleTracksActiveChange (
      value
    ) {
      this.isTracksActive = value
    },
    handleAlbumsActiveChange (
      value
    ) {
      this.isAlbumsActive = value
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

<style lang="sass" scoped></style>

<template>
  <BaseArtistLinkContainer
    class="item main-simple-list-item"
    :class="{
      disabled: isDeleted
    }"
    :artist-data="artistData"
    :profile-id="profileId"
    :is-link-to-library="isLinkToLibrary"
    :is-tracks-active="isTracksActive"
    :is-albums-active="isAlbumsActive"
    @link-click="handleLinkClick"
  >
    <BaseDeletedBlock
      v-if="isDeleted"
      model="artist"
    />
    <template v-else>
      <BaseArtistImage
        class="circular bordered"
        size="extrasmall"
        :class="{
          small: isImageSmall
        }"
        :image-data="imageData"
        :artist-name="artistName"
        @load-end="handleImageLoadEnd"
      />

      <div class="content">
        <BaseHeader
          tag="h4"
          :class="{
            link: isHeaderLink
          }"
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
          :top-tracks-count="topTracksCount"
          :top-albums-count="topAlbumsCount"
          :is-tracks-active="isTracksActive"
          :is-albums-active="isAlbumsActive"
          @tracks-active-change="handleTracksActiveChange"
          @albums-active-change="handleAlbumsActiveChange"
        />
      </div>

      <BaseSelfIcons
        v-if="isWithSelfIcons"
        :library-id="libraryId"
        :favorite-id="favoriteId"
        :bookmark-id="bookmarkId"
        :listened-id="listenedId"
      />

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
        @delete-option-click="handleDeleteOptionClick"
        @link-click="handleLinkClick"
      />

      <BaseBookmarkDeleteModal
        v-if="isBookmark"
        ref="deleteModal"
        model="artist"
        :model-data="artistData"
        @success="handleDeleted"
      />
      <BaseFavoriteDeleteModal
        v-else-if="isFavorite"
        ref="deleteModal"
        model="artist"
        :model-data="artistData"
        @success="handleDeleted"
      />
    </template>
  </BaseArtistLinkContainer>
</template>

<script>
import BaseArtistLinkContainer
  from '*/components/containers/artist/BaseArtistLinkContainer.vue'
import BaseDeletedBlock from '*/components/BaseDeletedBlock.vue'
import BaseArtistImage from '*/components/models/artist/BaseArtistImage.vue'
import BaseHeader from '*/components/BaseHeader.vue'
import BaseArtistListenersCount
  from '*/components/models/artist/BaseArtistListenersCount.vue'
import LibraryCountersSection from './ArtistItem/LibraryCountersSection.vue'
import BaseSelfIcons from '*/components/models/self/BaseSelfIcons.vue'
import BaseOptionsDropdown
  from '*/components/dropdowns/BaseOptionsDropdown.vue'
import BaseBookmarkDeleteModal
  from '*/components/modals/bookmark/BaseBookmarkDeleteModal.vue'
import BaseFavoriteDeleteModal
  from '*/components/modals/favorite/BaseFavoriteDeleteModal.vue'

export default {
  name: 'ArtistItem',
  components: {
    BaseArtistLinkContainer,
    BaseDeletedBlock,
    BaseArtistImage,
    BaseHeader,
    BaseArtistListenersCount,
    LibraryCountersSection,
    BaseSelfIcons,
    BaseOptionsDropdown,
    BaseBookmarkDeleteModal,
    BaseFavoriteDeleteModal
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
    topTracksCount: Number,
    topAlbumsCount: Number,
    isWithLibrary: Boolean,
    isLinkToLibrary: Boolean,
    profileId: String,
    isWithLibraryOption: Boolean,
    isWithFavoriteOption: Boolean,
    isWithBookmarkOption: Boolean,
    isWithListenedOption: Boolean,
    isWithDeleteOption: Boolean,
    isClearable: Boolean,
    isImageSmall: Boolean,
    isBookmark: Boolean,
    isFavorite: Boolean
  },
  emits: [
    'linkClick',
    'deleteButtonClick'
  ],
  data () {
    return {
      libraryId: null,
      favoriteId: null,
      bookmarkId: null,
      listenedId: null,
      isTracksActive: false,
      isAlbumsActive: false
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
    isHeaderLink () {
      return (
        !this.isTracksActive &&
          !this.isAlbumsActive
      )
    },
    isDeleted () {
      return !!this.artistData.isDeleted
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
      this.paginationItem.image = value
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
    handleDeleteOptionClick () {
      if (this.isClearable) {
        this.$emit(
          'deleteButtonClick',
          {
            uuid: this.uuid
          }
        )
      } else {
        this.$refs
          .deleteModal
          .show()
      }
    },
    handleDeleted () {
      this.paginationItem
        .isDeleted = true
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

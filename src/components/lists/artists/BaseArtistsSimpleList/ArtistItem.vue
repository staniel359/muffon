<template>
  <BaseArtistLinkContainer
    class="item main-simple-list-item"
    :class="{ disabled: isDeleted }"
    :artistData="artistData"
    :profileId="profileId"
    :isLinkToLibrary="isLinkToLibrary"
    :isTracksActive="isTracksActive"
    :isAlbumsActive="isAlbumsActive"
    @linkClick="handleLinkClick"
  >
    <BaseDeletedBlock
      v-if="isDeleted"
      model="artist"
    />
    <template v-else>
      <BaseArtistImage
        class="circular bordered"
        size="small"
        :class="{ small: isImageSmall }"
        :imageData="imageData"
        :artistName="artistName"
        @loadEnd="handleImageLoadEnd"
      />

      <div class="content">
        <BaseHeader
          tag="h4"
          :class="{ link: isHeaderLink }"
          :text="artistName"
        />

        <BaseArtistListenersCount
          v-if="isWithListenersCount"
          class="description"
          :artistName="artistName"
          :listenersCount="listenersCount"
          @loadEnd="handleListenersCountLoadEnd"
        />

        <LibraryCountersSection
          v-if="isWithLibrary"
          :artistData="artistData"
          :topTracksCount="topTracksCount"
          :topAlbumsCount="topAlbumsCount"
          :isTracksActive="isTracksActive"
          :isAlbumsActive="isAlbumsActive"
          @tracksActiveChange="handleTracksActiveChange"
          @albumsActiveChange="handleAlbumsActiveChange"
        />
      </div>

      <BaseSelfIcons
        v-if="isWithSelfIcons"
        :libraryId="libraryId"
        :favoriteId="favoriteId"
        :bookmarkId="bookmarkId"
        :listenedId="listenedId"
      />

      <BaseOptionsDropdown
        model="artist"
        :artistName="artistName"
        :libraryId="libraryId"
        :favoriteId="favoriteId"
        :bookmarkId="bookmarkId"
        :listenedId="listenedId"
        :isWithLibraryOption="isWithLibraryOption"
        :isWithFavoriteOption="isWithFavoriteOption"
        :isWithBookmarkOption="isWithBookmarkOption"
        :isWithListenedOption="isWithListenedOption"
        :isWithDeleteOption="isWithDeleteOption"
        @delete="handleDeleteOptionClick"
        @linkClick="handleLinkClick"
      />

      <BaseBookmarkDeleteModal
        v-if="isBookmark"
        ref="deleteModal"
        model="artist"
        :modelData="artistData"
        @deleted="handleDeleted"
      />
      <BaseFavoriteDeleteModal
        v-else-if="isFavorite"
        ref="deleteModal"
        model="artist"
        :modelData="artistData"
        @deleted="handleDeleted"
      />
    </template>
  </BaseArtistLinkContainer>
</template>

<script>
import BaseArtistLinkContainer
  from '@/containers/artist/BaseArtistLinkContainer.vue'
import BaseDeletedBlock from '@/BaseDeletedBlock.vue'
import BaseArtistImage from '@/models/artist/BaseArtistImage.vue'
import BaseHeader from '@/BaseHeader.vue'
import BaseArtistListenersCount
  from '@/models/artist/BaseArtistListenersCount.vue'
import LibraryCountersSection from './ArtistItem/LibraryCountersSection.vue'
import BaseSelfIcons from '@/models/self/BaseSelfIcons.vue'
import BaseOptionsDropdown from '@/dropdowns/BaseOptionsDropdown.vue'
import BaseBookmarkDeleteModal
  from '@/modals/bookmark/BaseBookmarkDeleteModal.vue'
import BaseFavoriteDeleteModal
  from '@/modals/favorite/BaseFavoriteDeleteModal.vue'

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
      return this.findPaginationItem({
        uuid: this.uuid
      })
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
      this.$emit('linkClick')
    },
    handleImageLoadEnd (value) {
      this.paginationItem.image = value
    },
    handleListenersCountLoadEnd (value) {
      this.paginationItem.listeners_count = value
    },
    handleTracksActiveChange (value) {
      this.isTracksActive = value
    },
    handleAlbumsActiveChange (value) {
      this.isAlbumsActive = value
    },
    handleDeleteOptionClick () {
      if (this.isClearable) {
        this.$emit(
          'deleteButtonClick',
          { uuid: this.uuid }
        )
      } else {
        this.$refs.deleteModal.show()
      }
    },
    handleDeleted () {
      this.paginationItem.isDeleted = true
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

<style lang="sass" scoped></style>

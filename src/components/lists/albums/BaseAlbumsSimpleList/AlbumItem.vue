<template>
  <BaseAlbumLinkContainer
    class="item main-simple-list-item"
    :class="{ disabled: isDeleted }"
    :albumData="albumData"
    :artistName="artistName"
    :profileId="profileId"
    :isLinkToLibrary="isLinkToLibrary"
    :isNoLink="isArtistNameActive"
    @linkClick="handleLinkClick"
  >
    <BaseDeletedBlock
      v-if="isDeleted"
      model="album"
    />
    <template v-else>
      <BaseImage
        class="rounded bordered"
        model="album"
        :image="imageData?.extrasmall"
      />

      <div class="content">
        <BaseHeader
          tag="h4"
          :class="{ link: isHeaderActive }"
          :text="albumTitle"
        />

        <ArtistNameSection
          v-if="isWithArtistName"
          :artists="artists"
          @activeChange="handleArtistNameActiveChange"
        />

        <BaseAlbumListenersCount
          v-if="isWithListenersCount"
          class="description"
          :albumTitle="albumTitle"
          :artistName="artistName"
          :listenersCount="listenersCount"
          @loadEnd="handleListenersCountLoadEnd"
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
        model="album"
        :artistName="artistName"
        :albumTitle="albumTitle"
        :imageUrl="imageData?.original"
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
        ref="modal"
        model="album"
        :modelData="albumData"
        @deleted="handleDeleted"
      />
      <BaseFavoriteDeleteModal
        v-else-if="isFavorite"
        ref="modal"
        model="album"
        :modelData="albumData"
        @deleted="handleDeleted"
      />
    </template>
  </BaseAlbumLinkContainer>
</template>

<script>
import BaseAlbumLinkContainer
  from '*/components/containers/album/BaseAlbumLinkContainer.vue'
import BaseDeletedBlock from '*/components/BaseDeletedBlock.vue'
import BaseImage from '*/components/images/BaseImage.vue'
import BaseHeader from '*/components/BaseHeader.vue'
import ArtistNameSection from './AlbumItem/ArtistNameSection.vue'
import BaseAlbumListenersCount
  from '*/components/models/album/BaseAlbumListenersCount.vue'
import BaseSelfIcons from '*/components/models/self/BaseSelfIcons.vue'
import BaseOptionsDropdown
  from '*/components/dropdowns/BaseOptionsDropdown.vue'
import BaseBookmarkDeleteModal
  from '*/components/modals/bookmark/BaseBookmarkDeleteModal.vue'
import BaseFavoriteDeleteModal
  from '*/components/modals/favorite/BaseFavoriteDeleteModal.vue'
import { artistName as formatArtistName } from '*/helpers/formatters'

export default {
  name: 'AlbumItem',
  components: {
    BaseAlbumLinkContainer,
    BaseDeletedBlock,
    BaseImage,
    BaseHeader,
    ArtistNameSection,
    BaseAlbumListenersCount,
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
    albumData: {
      type: Object,
      required: true
    },
    isWithSelfIcons: {
      type: Boolean,
      default: true
    },
    isWithArtistName: Boolean,
    isWithListenersCount: Boolean,
    isLinkToLibrary: Boolean,
    isWithLibraryOption: Boolean,
    isWithFavoriteOption: Boolean,
    isWithBookmarkOption: Boolean,
    isWithListenedOption: Boolean,
    isWithDeleteOption: Boolean,
    isClearable: Boolean,
    isBookmark: Boolean,
    isFavorite: Boolean,
    profileId: String
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
      isArtistNameActive: false
    }
  },
  computed: {
    artistName () {
      if (this.artists) {
        return formatArtistName(
          this.artists
        )
      } else {
        return null
      }
    },
    artists () {
      if (this.artistData) {
        return [this.artistData]
      } else {
        return this.albumData.artists
      }
    },
    artistData () {
      return this.albumData.artist
    },
    albumTitle () {
      return this.albumData.title
    },
    imageData () {
      return this.albumData.image
    },
    listenersCount () {
      return this.albumData.listeners_count
    },
    paginationItem () {
      return this.findPaginationItem({
        uuid: this.uuid
      })
    },
    uuid () {
      return this.albumData.uuid
    },
    isDeleted () {
      return !!this.albumData.isDeleted
    },
    isHeaderActive () {
      return !this.isArtistNameActive
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
    handleLinkClick () {
      this.$emit(
        'linkClick'
      )
    },
    handleDeleteOptionClick () {
      if (this.isClearable) {
        this.$emit(
          'deleteButtonClick',
          { uuid: this.uuid }
        )
      } else {
        this.$refs.modal.show()
      }
    },
    handleDeleted () {
      this.paginationItem.isDeleted = true
    },
    handleListenersCountLoadEnd (value) {
      this.paginationItem.listeners_count = value
    },
    handleArtistNameActiveChange (value) {
      this.isArtistNameActive = value
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

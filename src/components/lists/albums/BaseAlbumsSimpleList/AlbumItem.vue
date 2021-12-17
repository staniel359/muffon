<template>
  <BaseLinkContainer
    class="item main-simple-list-item"
    :class="{ disabled: isDeleted }"
    :link="link"
    @click="handleLinkClick"
  >
    <BaseDeletedBlock
      v-if="isDeleted"
      model="album"
    />
    <template v-else>
      <BaseImage
        class="rounded bordered"
        model="album"
        :image="imageData?.small"
      />

      <InfoBlock
        :albumTitle="albumTitle"
        :artistName="artistName"
        :listenersCount="listenersCount"
        :uuid="uuid"
        :isWithArtistName="isWithArtistName"
        :isArtistNameActive="isArtistNameActive"
        :isWithListenersCount="isWithListenersCount"
      />

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
        v-if="isFavorite"
        ref="modal"
        model="album"
        :modelData="albumData"
        @deleted="handleDeleted"
      />
    </template>
  </BaseLinkContainer>
</template>

<script>
import BaseLinkContainer from '@/containers/links/BaseLinkContainer.vue'
import BaseDeletedBlock from '@/BaseDeletedBlock.vue'
import BaseImage from '@/images/BaseImage.vue'
import InfoBlock from './AlbumItem/InfoBlock.vue'
import BaseSelfIcons from '@/models/self/BaseSelfIcons.vue'
import BaseOptionsDropdown from '@/dropdowns/BaseOptionsDropdown.vue'
import BaseBookmarkDeleteModal
  from '@/modals/bookmark/BaseBookmarkDeleteModal.vue'
import BaseFavoriteDeleteModal
  from '@/modals/favorite/BaseFavoriteDeleteModal.vue'
import {
  main as formatProfileLibraryArtistMainLink
} from '#/formatters/links/profile/library/artist'
import { main as formatArtistMainLink } from '#/formatters/links/artist'
import {
  main as formatProfileLibraryAlbumMainLink
} from '#/formatters/links/profile/library/album'
import { main as formatAlbumMainLink } from '#/formatters/links/album'
import formatAlbumRequestData from '#/formatters/request/album/requestData'

export default {
  name: 'AlbumItem',
  components: {
    BaseLinkContainer,
    BaseDeletedBlock,
    BaseImage,
    InfoBlock,
    BaseSelfIcons,
    BaseOptionsDropdown,
    BaseBookmarkDeleteModal,
    BaseFavoriteDeleteModal
  },
  provide () {
    return {
      setIsArtistNameActive: this.setIsArtistNameActive,
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
    link () {
      if (this.isArtistNameActive) {
        if (this.isLinkToLibrary) {
          return this.profileLibraryArtistMainLink
        } else {
          return this.artistMainLink
        }
      } else {
        if (this.isLinkToLibrary) {
          return this.profileLibraryAlbumMainLink
        } else {
          return this.albumMainLink
        }
      }
    },
    profileLibraryArtistMainLink () {
      return formatProfileLibraryArtistMainLink({
        profileId: this.profileId,
        artistId: this.artistId
      })
    },
    artistId () {
      return this.albumData.artist.id
    },
    artistMainLink () {
      return formatArtistMainLink({
        artistName: this.artistName
      })
    },
    artistName () {
      return this.albumData.artist.name
    },
    profileLibraryAlbumMainLink () {
      return formatProfileLibraryAlbumMainLink({
        profileId: this.profileId,
        albumId: this.albumId
      })
    },
    albumId () {
      return this.albumData.id?.toString()
    },
    albumMainLink () {
      return formatAlbumMainLink({
        artistName: this.artistName,
        albumTitle: this.albumTitle,
        sourceParams: this.sourceParams
      })
    },
    sourceParams () {
      return formatAlbumRequestData({
        sourceId: this.albumData.source_id,
        albumData: this.albumData,
        artistName: this.artistName
      })
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
    setIsArtistNameActive (value) {
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

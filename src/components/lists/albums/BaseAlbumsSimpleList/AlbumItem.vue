<template>
  <BaseLinkContainer
    class="item main-simple-list-item"
    :class="{ disabled: isDeleted }"
    :link="linkFormatted"
    @click="handleLinkClick"
  >
    <BaseDeletedBlock
      v-if="isDeleted"
      model="album"
    />
    <template v-else>
      <BaseImage
        class="rounded bordered"
        :image="imageData.extrasmall"
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
        :modelId="albumId"
        :libraryId="libraryId"
        :favoriteId="favoriteId"
        :bookmarkId="bookmarkId"
        :listenedId="listenedId"
        :isWithLibraryOption="isWithLibraryOption"
        :isWithFavoriteOption="isWithFavoriteOption"
        :isWithBookmarkOption="isWithBookmarkOption"
        :isWithListenedOption="isWithListenedOption"
        :isWithDeleteOption="isWithDeleteOption"
        :imageUrl="imageData.medium"
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
import BaseLinkContainer from '@/containers/BaseLinkContainer.vue'
import BaseDeletedBlock from '@/BaseDeletedBlock.vue'
import BaseImage from '@/BaseImage.vue'
import InfoBlock from './AlbumItem/InfoBlock.vue'
import BaseSelfIcons from '@/models/self/BaseSelfIcons.vue'
import BaseOptionsDropdown from '@/BaseOptionsDropdown.vue'
import BaseBookmarkDeleteModal from '@/BaseBookmarkDeleteModal.vue'
import BaseFavoriteDeleteModal from '@/BaseFavoriteDeleteModal.vue'
import { main as formatArtistMainLink } from '#/formatters/links/artist'
import { main as formatAlbumMainLink } from '#/formatters/links/album'

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
      isArtistNameActive: false,
      isDeleted: false
    }
  },
  computed: {
    linkFormatted () {
      if (this.isArtistNameActive) {
        return this.artistMainLinkFormatted
      } else {
        return this.albumMainLinkFormatted
      }
    },
    artistMainLinkFormatted () {
      return formatArtistMainLink({
        artistName: this.artistName
      })
    },
    artistName () {
      return this.albumData.artist.name
    },
    albumMainLinkFormatted () {
      return formatAlbumMainLink({
        artistName: this.artistName,
        albumTitle: this.albumTitle
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
    uuid () {
      return this.albumData.uuid
    },
    albumId () {
      return this.albumData.id.toString()
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
      this.$emit('linkClick')
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
      this.isDeleted = true
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

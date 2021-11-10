<template>
  <BaseLinkContainer
    class="item main-simple-list-item"
    :class="{ disabled: isDeleted }"
    :link="linkFormatted"
    @click="handleLinkClick"
  >
    <BaseDeletedBlock
      v-if="isDeleted"
      model="artist"
    />
    <template v-else>
      <BaseArtistImage
        class="circular bordered"
        size="extrasmall"
        :class="{ small: isImageSmall }"
        :image="image"
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
          :isWithTracksCount="isWithTracksCount"
          :tracksCount="tracksCount"
          :topTracksCount="topTracksCount"
          :isWithAlbumsCount="isWithAlbumsCount"
          :albumsCount="albumsCount"
          :topAlbumsCount="topAlbumsCount"
          @tracksLinkActiveChange="handleTracksLinkActiveChange"
          @albumsLinkActiveChange="handleAlbumsLinkActiveChange"
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
  </BaseLinkContainer>
</template>

<script>
import BaseLinkContainer from '@/containers/BaseLinkContainer.vue'
import BaseDeletedBlock from '@/BaseDeletedBlock.vue'
import BaseArtistImage from '@/models/artist/BaseArtistImage.vue'
import BaseHeader from '@/BaseHeader.vue'
import BaseArtistListenersCount
  from '@/models/artist/BaseArtistListenersCount.vue'
import LibraryCountersSection from './ArtistItem/LibraryCountersSection.vue'
import BaseSelfIcons from '@/models/self/BaseSelfIcons.vue'
import BaseOptionsDropdown from '@/BaseOptionsDropdown.vue'
import BaseBookmarkDeleteModal from '@/BaseBookmarkDeleteModal.vue'
import BaseFavoriteDeleteModal from '@/BaseFavoriteDeleteModal.vue'
import { main as formatArtistMainLink } from '#/formatters/links/artist'
import {
  main as formatProfileLibraryArtistMainLink,
  tracks as formatProfileLibraryArtistTracksLink,
  albums as formatProfileLibraryArtistAlbumsLink
} from '#/formatters/links/profile/library/artist'

export default {
  name: 'ArtistItem',
  components: {
    BaseLinkContainer,
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
    isWithTracksCount: Boolean,
    topTracksCount: Number,
    isWithAlbumsCount: Boolean,
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
      isAlbumsLinkActive: false,
      isDeleted: false,
      isTracksLinkActive: false
    }
  },
  computed: {
    linkFormatted () {
      if (this.isLinkToLibrary) {
        if (this.isTracksLinkActive) {
          return formatProfileLibraryArtistTracksLink({
            profileId: this.profileId,
            artistId: this.artistId
          })
        } else if (this.isAlbumsLinkActive) {
          return formatProfileLibraryArtistAlbumsLink({
            profileId: this.profileId,
            artistId: this.artistId
          })
        } else {
          return formatProfileLibraryArtistMainLink({
            profileId: this.profileId,
            artistId: this.artistId
          })
        }
      } else {
        return formatArtistMainLink({
          artistName: this.artistName
        })
      }
    },
    artistId () {
      return this.artistData.id.toString()
    },
    image () {
      return this.artistData.image
    },
    artistName () {
      return this.artistData.name
    },
    listenersCount () {
      return this.artistData.listeners_count
    },
    uuid () {
      return this.artistData.uuid
    },
    tracksCount () {
      return this.artistData.tracks_count
    },
    albumsCount () {
      return this.artistData.albums_count
    },
    isHeaderLink () {
      return (
        !this.isTracksLinkActive &&
          !this.isAlbumsLinkActive
      )
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
      this.findPaginationItem({
        uuid: this.uuid
      }).image = value
    },
    handleListenersCountLoadEnd (value) {
      this.findPaginationItem({
        uuid: this.uuid
      }).listeners_count = value
    },
    handleTracksLinkActiveChange (value) {
      this.isTracksLinkActive = value
    },
    handleAlbumsLinkActiveChange (value) {
      this.isAlbumsLinkActive = value
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
      this.isDeleted = true
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

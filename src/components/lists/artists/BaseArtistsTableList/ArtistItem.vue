<template>
  <BaseLinkContainer
    :link="linkFormatted"
    @click="handleLinkClick"
  >
    <BaseSimpleCardContainer>
      <div class="main-simple-card-image-container">
        <BaseArtistImage
          class="circular bordered"
          :image="image"
          :artistName="artistName"
          @loadEnd="handleImageLoadEnd"
        />
      </div>

      <BaseOptionsDropdown
        model="artist"
        :modelId="artistArtistId"
        :libraryId="libraryId"
        :favoriteId="favoriteId"
        :bookmarkId="bookmarkId"
        :listenedId="listenedId"
        :isWithLibraryOption="isWithLibraryOption"
        :isWithFavoriteOption="isWithFavoriteOption"
        :isWithBookmarkOption="isWithBookmarkOption"
        :isWithListenedOption="isWithListenedOption"
        :isWithDeleteOption="isWithDeleteOption"
        @linkClick="handleLinkClick"
        isWhite
        @delete="handleDeleteOptionClick"
      />

      <div class="content">
        <BaseHeader
          :class="{ link: isHeaderLink }"
          tag="h4"
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
          v-if="isWithTracksCount || isWithAlbumsCount"
          :artistData="artistData"
          :isWithTracksCount="isWithTracksCount"
          :isWithAlbumsCount="isWithAlbumsCount"
          @tracksLinkActiveChange="handleTracksLinkActiveChange"
          @albumsLinkActiveChange="handleAlbumsLinkActiveChange"
        />

        <BaseSelfIcons
          v-if="isWithSelfIcons"
          :libraryId="libraryId"
          :favoriteId="favoriteId"
          :bookmarkId="bookmarkId"
          :listenedId="listenedId"
        />
      </div>
    </BaseSimpleCardContainer>
  </BaseLinkContainer>

  <BaseProfileLibraryDeleteModal
    v-if="isLinkToLibrary"
    ref="deleteModal"
    model="artist"
    :profileId="profileId"
    :modelId="artistId"
    :modelTitle="artistName"
  />
</template>

<script>
import BaseLinkContainer from '@/containers/BaseLinkContainer.vue'
import BaseSimpleCardContainer from '@/containers/BaseSimpleCardContainer.vue'
import BaseArtistImage from '@/models/artist/BaseArtistImage.vue'
import BaseOptionsDropdown from '@/BaseOptionsDropdown.vue'
import BaseHeader from '@/BaseHeader.vue'
import BaseArtistListenersCount
  from '@/models/artist/BaseArtistListenersCount.vue'
import LibraryCountersSection from './ArtistItem/LibraryCountersSection.vue'
import BaseSelfIcons from '@/models/self/BaseSelfIcons.vue'
import BaseProfileLibraryDeleteModal
  from '@/models/profile/library/BaseProfileLibraryDeleteModal.vue'
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
    BaseSimpleCardContainer,
    BaseArtistImage,
    BaseOptionsDropdown,
    BaseHeader,
    BaseArtistListenersCount,
    LibraryCountersSection,
    BaseSelfIcons,
    BaseProfileLibraryDeleteModal
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
    isWithAlbumsCount: Boolean,
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
      isTracksLinkActive: false,
      isAlbumsLinkActive: false,
      libraryId: null,
      favoriteId: null,
      bookmarkId: null,
      listenedId: null
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
    artistArtistId () {
      return (
        this.artistData.artist_id ||
          this.artistId
      )?.toString()
    },
    artistName () {
      return this.artistData.name
    },
    image () {
      return this.artistData.image
    },
    listenersCount () {
      return this.artistData.listeners_count
    },
    uuid () {
      return this.artistData.uuid
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
      this.$refs.deleteModal.show()
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

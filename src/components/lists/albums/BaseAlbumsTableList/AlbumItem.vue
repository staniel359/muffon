<template>
  <BaseLinkContainer
    :link="linkFormatted"
    @click="handleLinkClick"
  >
    <BaseSimpleCardContainer
      :image="imageData.medium"
    >
      <BaseOptionsDropdown
        class="options"
        model="album"
        :artistName="albumArtistName"
        :albumTitle="albumTitle"
        :imageUrl="imageData.medium"
        :libraryId="libraryId"
        :favoriteId="favoriteId"
        :bookmarkId="bookmarkId"
        :listenedId="listenedId"
        :isWithLibraryOption="isWithLibraryOption"
        :isWithFavoriteOption="isWithFavoriteOption"
        :isWithBookmarkOption="isWithBookmarkOption"
        :isWithListenedOption="isWithListenedOption"
        :isWithDeleteOption="isWithDeleteOption"
        isWhite
        @linkClick="handleLinkClick"
      />

      <InfoSection
        :albumData="albumData"
        :artistName="albumArtistName"
        :isWithArtistName="isWithArtistName"
        :isArtistNameActive="isArtistNameActive"
        :isTracksLinkActive="isTracksLinkActive"
        :isWithListenersCount="isWithListenersCount"
        :isWithTracksCount="isWithTracksCount"
        :libraryId="libraryId"
        :favoriteId="favoriteId"
        :bookmarkId="bookmarkId"
        :listenedId="listenedId"
        @tracksLinkActiveChange="handleTracksLinkActiveChange"
      />
    </BaseSimpleCardContainer>
  </BaseLinkContainer>
</template>

<script>
import BaseLinkContainer from '@/containers/links/BaseLinkContainer.vue'
import BaseSimpleCardContainer from '@/containers/BaseSimpleCardContainer.vue'
import BaseOptionsDropdown from '@/dropdowns/BaseOptionsDropdown.vue'
import InfoSection from './AlbumItem/InfoSection.vue'
import { main as formatArtistMainLink } from '#/formatters/links/artist'
import { main as formatAlbumMainLink } from '#/formatters/links/album'
import {
  main as formatProfileLibraryArtistMainLink
} from '#/formatters/links/profile/library/artist'
import {
  main as formatProfileLibraryAlbumMainLink,
  tracks as formatProfileLibraryAlbumTracksLink
} from '#/formatters/links/profile/library/album'
import formatAlbumSourceParams
  from '#/actions/api/album/formatters/requestData'

export default {
  name: 'AlbumItem',
  components: {
    BaseLinkContainer,
    BaseSimpleCardContainer,
    BaseOptionsDropdown,
    InfoSection
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
    artistName: String,
    isWithArtistName: Boolean,
    isWithListenersCount: Boolean,
    isWithTracksCount: Boolean,
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
      isArtistNameActive: false,
      isTracksLinkActive: false,
      libraryId: null,
      favoriteId: null,
      bookmarkId: null,
      listenedId: null
    }
  },
  computed: {
    linkFormatted () {
      if (this.isArtistNameActive) {
        return this.artistMainLinkFormatted
      } else if (this.isTracksLinkActive) {
        return this.profileLibraryAlbumTracksLinkFormatted
      } else {
        return this.albumMainLinkFormatted
      }
    },
    artistMainLinkFormatted () {
      if (this.isLinkToLibrary) {
        return formatProfileLibraryArtistMainLink({
          profileId: this.profileId,
          artistId: this.artistId
        })
      } else {
        return formatArtistMainLink({
          artistName: this.albumArtistName
        })
      }
    },
    albumArtistName () {
      return (
        this.albumData.artist?.name ||
          this.artistName
      )
    },
    profileLibraryAlbumTracksLinkFormatted () {
      return formatProfileLibraryAlbumTracksLink({
        profileId: this.profileId,
        albumId: this.albumId
      })
    },
    albumMainLinkFormatted () {
      if (this.isLinkToLibrary) {
        return formatProfileLibraryAlbumMainLink({
          profileId: this.profileId,
          albumId: this.albumId
        })
      } else {
        return formatAlbumMainLink({
          artistName: this.albumArtistName,
          albumTitle: this.albumTitle,
          sourceParams: this.sourceParams
        })
      }
    },
    sourceParams () {
      return formatAlbumSourceParams({
        sourceId: this.albumData.source_id,
        albumData: this.albumData,
        artistName: this.albumArtistName
      })
    },
    albumTitle () {
      return this.albumData.title
    },
    imageData () {
      return this.albumData.image
    },
    artistId () {
      return this.albumData.artist.id
    },
    albumId () {
      return this.albumData.id?.toString()
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
    handleTracksLinkActiveChange (value) {
      this.isTracksLinkActive = value
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

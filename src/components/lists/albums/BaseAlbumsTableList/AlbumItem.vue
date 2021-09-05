<template>
  <BaseLinkContainer
    :link="linkFormatted"
    @click="handleLinkClick"
  >
    <BaseSimpleCardContainer :image="image">
      <InfoSection
        :albumData="albumData"
        :artistName="albumArtistName"
        :isWithArtistName="isWithArtistName"
        :isArtistNameActive="isArtistNameActive"
        :isTracksLinkActive="isTracksLinkActive"
        :isWithListenersCount="isWithListenersCount"
        :isWithTracksCount="isWithTracksCount"
        :isWithLibraryLink="isWithLibraryLink"
        :isWithListenedButton="isWithListenedButton"
        :isWithBookmarkButton="isWithBookmarkButton"
        @tracksLinkActiveChange="handleTracksLinkActiveChange"
      />
    </BaseSimpleCardContainer>
  </BaseLinkContainer>
</template>

<script>
import BaseLinkContainer from '@/containers/BaseLinkContainer.vue'
import BaseSimpleCardContainer from '@/containers/BaseSimpleCardContainer.vue'
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

export default {
  name: 'AlbumItem',
  components: {
    BaseLinkContainer,
    BaseSimpleCardContainer,
    InfoSection
  },
  provide () {
    return {
      setIsArtistNameActive: this.setIsArtistNameActive
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
    isWithLibraryLink: Boolean,
    isWithListenedButton: Boolean,
    isWithBookmarkButton: Boolean
  },
  emits: [
    'linkClick'
  ],
  data () {
    return {
      isArtistNameActive: false,
      isTracksLinkActive: false
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
          albumTitle: this.albumTitle
        })
      }
    },
    albumTitle () {
      return this.albumData.title
    },
    image () {
      return this.albumData.image.medium
    },
    artistId () {
      return this.albumData.artist.id
    },
    albumId () {
      return this.albumData.id
    }
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
    }
  }
}
</script>

<style lang="sass" scoped></style>

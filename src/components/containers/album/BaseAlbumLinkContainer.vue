<template>
  <BaseLinkContainer
    :link="link"
    @click="handleLinkClick"
  >
    <slot></slot>
  </BaseLinkContainer>
</template>

<script>
import BaseLinkContainer from '@/containers/links/BaseLinkContainer.vue'
import {
  main as formatProfileLibraryArtistMainLink
} from '#/formatters/links/profile/library/artist'
import { main as formatArtistMainLink } from '#/formatters/links/artist'
import {
  main as formatProfileLibraryAlbumMainLink,
  tracks as formatProfileLibraryAlbumTracksLink
} from '#/formatters/links/profile/library/album'
import { main as formatAlbumMainLink } from '#/formatters/links/album'
import formatAlbumRequestData from '#/formatters/request/album/requestData'

export default {
  name: 'BaseAlbumLinkContainer',
  components: {
    BaseLinkContainer
  },
  props: {
    albumData: {
      type: Object,
      required: true
    },
    profileId: String,
    artistName: String,
    isLinkToLibrary: Boolean,
    isArtistNameActive: Boolean,
    isTracksActive: Boolean,
    isNoLink: Boolean
  },
  emits: [
    'linkClick'
  ],
  computed: {
    link () {
      if (this.isNoLink) {
        return {}
      } else if (this.isArtistNameActive) {
        if (this.isLinkToLibrary) {
          return this.profileLibraryArtistMainLink
        } else {
          return this.artistMainLink
        }
      } else if (this.isTracksActive) {
        return this.profileLibraryAlbumTracksLink
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
    profileLibraryAlbumTracksLink () {
      return formatProfileLibraryAlbumTracksLink({
        profileId: this.profileId,
        albumId: this.albumId
      })
    },
    albumId () {
      return this.albumData.id?.toString()
    },
    profileLibraryAlbumMainLink () {
      return formatProfileLibraryAlbumMainLink({
        profileId: this.profileId,
        albumId: this.albumId
      })
    },
    albumMainLink () {
      return formatAlbumMainLink({
        artistName: this.artistName,
        albumTitle: this.albumTitle,
        sourceParams: this.sourceParams
      })
    },
    albumTitle () {
      return this.albumData.title
    },
    sourceParams () {
      return formatAlbumRequestData({
        sourceId: this.albumData.source_id,
        albumData: this.albumData,
        artistName: this.artistName
      })
    }
  },
  methods: {
    handleLinkClick () {
      this.$emit('linkClick')
    }
  }
}
</script>

<style lang="sass" scoped></style>

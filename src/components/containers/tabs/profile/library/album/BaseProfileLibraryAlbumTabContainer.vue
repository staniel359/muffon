<template>
  <BasePaginatedTabContainer
    :response-data="albumData"
    :scope="scope"
    :limit="limit"
    :is-loading="isLoading"
    :error="error"
    :is-active="isActive"
    :more-link="moreLink"
    @focus="handleFocus"
    @activate="handleActivate"
  >
    <template
      #default="slotProps"
    >
      <slot
        :[scope]="slotProps[scope]"
        :artist-name="artistName"
      />
    </template>
  </BasePaginatedTabContainer>
</template>

<script>
import tabContainerMixin from '@/mixins/tabContainerMixin'
import getProfileLibraryAlbum
  from '@/helpers/actions/api/profile/library/album/get'
import {
  tracks as formatProfileLibraryAlbumTracksLink,
  playlists as formatProfileLibraryAlbumPlaylistsLink
} from '@/helpers/formatters/links/profile/library/album'

export default {
  name: 'BaseProfileLibraryAlbumTabContainer',
  mixins: [
    tabContainerMixin
  ],
  props: {
    profileId: {
      type: String,
      required: true
    },
    libraryAlbumId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      profileData: null
    }
  },
  computed: {
    libraryAlbumArgs () {
      return {
        profileId: this.profileId,
        libraryAlbumId:
          this.libraryAlbumId,
        scope: this.scope,
        limit: this.limit
      }
    },
    albumData () {
      return this.profileData?.library?.album
    },
    artistName () {
      return this.albumData?.artist?.name
    },
    moreLink () {
      switch (this.scope) {
        case 'tracks':
          return formatProfileLibraryAlbumTracksLink(
            {
              profileId: this.profileId,
              libraryAlbumId:
                this.libraryAlbumId
            }
          )
        case 'playlists':
          return formatProfileLibraryAlbumPlaylistsLink(
            {
              profileId: this.profileId,
              libraryAlbumId:
                this.libraryAlbumId
            }
          )
        default:
          return {}
      }
    }
  },
  methods: {
    getProfileLibraryAlbum,
    getData (
      {
        page
      } = {}
    ) {
      this.getProfileLibraryAlbum(
        {
          ...this.libraryAlbumArgs,
          page
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>

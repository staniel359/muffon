<template>
  <BasePaginatedTabContainer
    :response-data="artistData"
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
      />
    </template>
  </BasePaginatedTabContainer>
</template>

<script>
import tabContainerMixin from '@/mixins/tabContainerMixin'
import getProfileLibraryArtist
  from '@/helpers/actions/api/profile/library/artist/get'
import {
  albums as formatProfileLibraryArtistAlbumsLink,
  tracks as formatProfileLibraryArtistTracksLink,
  playlists as formatProfileLibraryArtistPlaylistsLink
} from '@/helpers/formatters/links/profile/library/artist'

export default {
  name: 'BaseProfileLibraryArtistTabContainer',
  mixins: [
    tabContainerMixin
  ],
  props: {
    profileId: {
      type: String,
      required: true
    },
    libraryArtistId: {
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
    libraryArtistArgs () {
      return {
        profileId: this.profileId,
        libraryArtistId:
          this.libraryArtistId,
        scope: this.scope,
        limit: this.limit
      }
    },
    artistData () {
      return this.profileData?.library?.artist
    },
    moreLink () {
      switch (this.scope) {
        case 'albums':
          return formatProfileLibraryArtistAlbumsLink(
            {
              profileId: this.profileId,
              libraryArtistId:
                this.libraryArtistId
            }
          )
        case 'tracks':
          return formatProfileLibraryArtistTracksLink(
            {
              profileId: this.profileId,
              libraryArtistId:
                this.libraryArtistId
            }
          )
        case 'playlists':
          return formatProfileLibraryArtistPlaylistsLink(
            {
              profileId: this.profileId,
              libraryArtistId:
                this.libraryArtistId
            }
          )
        default:
          return {}
      }
    }
  },
  methods: {
    getProfileLibraryArtist,
    getData (
      {
        page
      } = {}
    ) {
      this.getProfileLibraryArtist(
        {
          ...this.libraryArtistArgs,
          page
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>

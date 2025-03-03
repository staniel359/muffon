<template>
  <BasePaginatedTabContainer
    :response-data="albumData"
    :scope="scope"
    :limit="limit"
    :is-loading="isLoading"
    :error="error"
    :is-active="isActive"
    :more-link="moreLink"
    :is-with-top-section="isWithTopSection"
    :is-with-play-button="isWithPlayButton"
    @focus="handleFocus"
    @activate="handleActivate"
  >
    <template
      #topPlayButton
    >
      <slot
        name="topPlayButton"
      />
    </template>

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
      type: Number,
      required: true
    },
    libraryAlbumId: {
      type: Number,
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

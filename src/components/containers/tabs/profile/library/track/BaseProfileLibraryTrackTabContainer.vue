<template>
  <BasePaginatedTabContainer
    :response-data="trackData"
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
import getProfileLibraryTrack
  from '@/helpers/actions/api/profile/library/track/get'
import {
  albums as formatProfileLibraryTrackAlbumsLink,
  playlists as formatProfileLibraryTrackPlaylistsLink
} from '@/helpers/formatters/links/profile/library/track'

export default {
  name: 'BaseProfileLibraryTrackTabContainer',
  mixins: [
    tabContainerMixin
  ],
  props: {
    profileId: {
      type: String,
      required: true
    },
    libraryTrackId: {
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
    libraryTrackArgs () {
      return {
        profileId: this.profileId,
        libraryTrackId:
          this.libraryTrackId,
        scope: this.scope,
        limit: this.limit
      }
    },
    trackData () {
      return this.profileData?.library?.track
    },
    moreLink () {
      switch (this.scope) {
        case 'albums':
          return formatProfileLibraryTrackAlbumsLink(
            {
              profileId: this.profileId,
              libraryTrackId:
                this.libraryTrackId
            }
          )
        case 'playlists':
          return formatProfileLibraryTrackPlaylistsLink(
            {
              profileId: this.profileId,
              libraryTrackId:
                this.libraryTrackId
            }
          )
        default:
          return {}
      }
    }
  },
  methods: {
    getProfileLibraryTrack,
    getData (
      {
        page
      } = {}
    ) {
      this.getProfileLibraryTrack(
        {
          ...this.libraryTrackArgs,
          page
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>

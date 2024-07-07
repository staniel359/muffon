<template>
  <BasePaginatedTabContainer
    :response-data="libraryData"
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
import getProfileLibrary from '@/helpers/actions/api/profile/library/get'
import {
  artists as formatProfileLibraryArtistsLink,
  albums as formatProfileLibraryAlbumsLink,
  tracks as formatProfileLibraryTracksLink,
  tags as formatProfileLibraryTagsLink
} from '@/helpers/formatters/links/profile/library'

export default {
  name: 'BaseProfileLibraryTabContainer',
  mixins: [
    tabContainerMixin
  ],
  props: {
    profileId: {
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
    libraryArgs () {
      return {
        profileId: this.profileId,
        scope: this.scope,
        limit: this.limit
      }
    },
    libraryData () {
      return this.profileData?.library
    },
    moreLink () {
      switch (this.scope) {
        case 'artists':
          return formatProfileLibraryArtistsLink(
            {
              profileId: this.profileId
            }
          )
        case 'albums':
          return formatProfileLibraryAlbumsLink(
            {
              profileId: this.profileId
            }
          )
        case 'tracks':
          return formatProfileLibraryTracksLink(
            {
              profileId: this.profileId
            }
          )
        case 'tags':
          return formatProfileLibraryTagsLink(
            {
              profileId: this.profileId
            }
          )
        default:
          return {}
      }
    }
  },
  methods: {
    getProfileLibrary,
    getData (
      {
        page
      } = {}
    ) {
      this.getProfileLibrary(
        {
          ...this.libraryArgs,
          page
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>

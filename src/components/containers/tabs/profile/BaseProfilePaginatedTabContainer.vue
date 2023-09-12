<template>
  <BasePaginatedTabContainer
    :response-data="profileData"
    :scope="scope"
    :limit="limit"
    :is-loading="isLoading"
    :error="error"
    :is-active="isActive"
    :more-link="moreLink"
    :is-with-top-segment="isWithTopSegment"
    @focus="handleFocus"
    @activate="handleActivate"
  >
    <template
      #top
    >
      <slot
        name="top"
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
import getProfile from '@/helpers/actions/api/profile/get'
import {
  playlists as formatProfilePlaylistsLink,
  communities as formatProfileCommunitiesLink,
  posts as formatProfilePostsLink
} from '@/helpers/formatters/links/profile'

export default {
  name: 'BaseProfilePaginatedTabContainer',
  mixins: [
    tabContainerMixin
  ],
  props: {
    profileId: {
      type: String,
      required: true
    },
    isWithTopSegment: Boolean
  },
  data () {
    return {
      profileData: null
    }
  },
  computed: {
    profileArgs () {
      return {
        profileId: this.profileId,
        scope: this.scope,
        limit: this.limit
      }
    },
    moreLink () {
      switch (this.scope) {
        case 'playlists':
          return formatProfilePlaylistsLink(
            {
              profileId: this.profileId
            }
          )
        case 'communities':
          return formatProfileCommunitiesLink(
            {
              profileId: this.profileId
            }
          )
        case 'posts':
          return formatProfilePostsLink(
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
    getProfile,
    getData (
      {
        page
      } = {}
    ) {
      this.getProfile(
        {
          ...this.profileArgs,
          page
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>

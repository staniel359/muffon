<template>
  <BasePageContainer
    :isShowLoader="!profileData"
    :isLoading="isLoading"
    :isError="!profileData && !!error"
    :error="error"
    @refresh="handleRefresh"
  >
    <slot
      v-if="profileData"
      :isLoading="isLoading"
      :error="error"
      :profileData="profileData"
      :libraryData="libraryData"
      :fetchData="fetchData"
      :handleRefresh="handleRefresh"
    ></slot>
  </BasePageContainer>
</template>

<script>
import BasePageContainer from '@/containers/pages/BasePageContainer.vue'
import navigationMixin from '*/mixins/navigationMixin'
import formatProfilePageNavigation from '#/formatters/navigation/profile'
import formatProfilePageTab from '#/formatters/tabs/profile'
import formatProfileLibraryPageTab from '#/formatters/tabs/profile/library'
import formatProfileFavoritesPageTab from '#/formatters/tabs/profile/favorites'
import formatProfilePlaylistsPageTab from '#/formatters/tabs/profile/playlists'
import formatProfilePostsPageTab from '#/formatters/tabs/profile/posts'
import formatProfileCommunitiesPageTab
  from '#/formatters/tabs/profile/communities'
import getProfile from '#/actions/api/profile/get'

export default {
  name: 'BaseProfilePageContainer',
  components: {
    BasePageContainer
  },
  mixins: [
    navigationMixin
  ],
  provide () {
    return {
      setIsFollowing: this.setIsFollowing,
      setFollowersCount: this.setFollowersCount
    }
  },
  props: {
    profileId: {
      type: String,
      required: true
    },
    scope: String,
    responsePageLimit: Number,
    pageNameKey: String
  },
  data () {
    return {
      error: null,
      profileData: null,
      isLoading: false
    }
  },
  computed: {
    navigationSections () {
      return formatProfilePageNavigation(
        this.navigationData
      )
    },
    navigationData () {
      return {
        profileId: this.profileId,
        profileNickname: this.profileNicknameFetched,
        pageNameKey: this.pageNameKey
      }
    },
    profileNicknameFetched () {
      return this.profileData?.nickname
    },
    profileArgs () {
      return {
        profileId: this.profileId,
        scope: this.scope,
        limit: this.responsePageLimit
      }
    },
    libraryData () {
      return this.profileData?.library
    },
    tabData () {
      switch (this.pageNameKey) {
        case 'library':
          return formatProfileLibraryPageTab(
            this.navigationData
          )
        case 'favorites':
          return formatProfileFavoritesPageTab(
            this.navigationData
          )
        case 'playlists':
          return formatProfilePlaylistsPageTab(
            this.navigationData
          )
        case 'posts':
          return formatProfilePostsPageTab(
            this.navigationData
          )
        case 'communities':
          return formatProfileCommunitiesPageTab(
            this.navigationData
          )
        default:
          return formatProfilePageTab(
            this.navigationData
          )
      }
    }
  },
  watch: {
    profileData: 'handleNavigationDataChange'
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    handleRefresh (page) {
      this.fetchData(page)
    },
    getProfile,
    fetchData (page) {
      this.getProfile({
        ...this.profileArgs,
        page
      })
    },
    setIsFollowing (value) {
      this.profileData
        .other_profile
        .follower_of_profile = value
    },
    setFollowersCount (value) {
      this.profileData
        .follower_profiles_count = value
    }
  }
}
</script>

<style lang="sass" scoped></style>

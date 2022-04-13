<template>
  <BasePageContainer
    :response-data="profileData"
    :is-loading="isLoading"
    :error="error"
  >
    <slot
      :profile-data="profileData"
      :is-loading="isLoading"
      :error="error"
      :fetch-data="fetchData"
      :refresh="refresh"
    />
  </BasePageContainer>
</template>

<script>
import BasePageContainer
  from '*/components/containers/pages/BasePageContainer.vue'
import navigationMixin from '*/mixins/navigationMixin'
import formatProfilePageNavigation
  from '*/helpers/formatters/navigation/profile'
import formatProfileCommunitiesPageTab
  from '*/helpers/formatters/tabs/profile/communities'
import getProfileCommunities from '*/helpers/actions/api/profile/get'

export default {
  name: 'BaseProfileCommunitiesPageContainer',
  components: {
    BasePageContainer
  },
  mixins: [
    navigationMixin
  ],
  props: {
    profileId: {
      type: String,
      required: true
    },
    limit: Number
  },
  data () {
    return {
      error: null,
      profileData: null,
      isLoading: false,
      scope: 'communities'
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
        profileNickname:
          this.profileNicknameFetched,
        scope: this.scope
      }
    },
    profileNicknameFetched () {
      return this.profileData?.nickname
    },
    communitiesArgs () {
      return {
        profileId: this.profileId,
        scope: this.scope,
        limit: this.limit
      }
    },
    tabData () {
      return formatProfileCommunitiesPageTab(
        this.navigationData
      )
    }
  },
  watch: {
    profileData: 'handleNavigationDataChange'
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    getProfileCommunities,
    fetchData (
      page
    ) {
      this.getProfileCommunities(
        {
          ...this.communitiesArgs,
          page
        }
      )
    },
    refresh (
      page
    ) {
      this.fetchData(
        page
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>

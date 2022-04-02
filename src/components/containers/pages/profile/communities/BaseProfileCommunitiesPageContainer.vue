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
      :fetchData="fetchData"
      :handleRefresh="handleRefresh"
    ></slot>
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
    responsePageLimit: Number
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
        profileNickname:
          this.profileNicknameFetched,
        scope: 'communities'
      }
    },
    profileNicknameFetched () {
      return this.profileData?.nickname
    },
    communitiesArgs () {
      return {
        profileId: this.profileId,
        scope: 'communities',
        limit: this.responsePageLimit
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
    handleRefresh (page) {
      this.fetchData(page)
    },
    getProfileCommunities,
    fetchData (page) {
      this.getProfileCommunities({
        ...this.communitiesArgs,
        page
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>

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
import formatProfilePageTab from '*/helpers/formatters/tabs/profile'
import getProfile from '*/helpers/actions/api/profile/get'

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
          this.profileNicknameFetched
      }
    },
    profileNicknameFetched () {
      return this.profileData?.nickname
    },
    profileArgs () {
      return {
        profileId: this.profileId,
        limit: this.responsePageLimit
      }
    },
    tabData () {
      return formatProfilePageTab(
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

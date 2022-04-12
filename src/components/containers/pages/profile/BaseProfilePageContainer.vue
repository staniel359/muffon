<template>
  <BasePageContainer
    :responseData="profileData"
    :isLoading="isLoading"
    :error="error"
  >
    <slot
      :profileData="profileData"
      :profileNickname="profileNicknameFetched"
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
    limit: Number
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
        limit: this.limit
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

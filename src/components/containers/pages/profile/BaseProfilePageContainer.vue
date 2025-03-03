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
    />
  </BasePageContainer>
</template>

<script>
import BasePageContainer
  from '@/components/containers/pages/BasePageContainer.vue'
import navigationMixin from '@/mixins/navigationMixin'
import formatProfilePageNavigation
  from '@/helpers/formatters/navigation/profile'
import formatProfilePageTab from '@/helpers/formatters/tabs/profile'
import getProfile from '@/helpers/actions/api/profile/get'

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
      setIsFollowing:
        this.setIsFollowing,
      setFollowersCount:
        this.setFollowersCount
    }
  },
  props: {
    profileId: {
      type: Number,
      required: true
    },
    scope: String,
    limit: Number,
    order: String
  },
  data () {
    return {
      profileData: null,
      error: null,
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
        profileNickname: this.profileNickname,
        scope: this.scope
      }
    },
    profileNickname () {
      return this.profileData?.nickname
    },
    profileArgs () {
      return {
        profileId: this.profileId,
        scope: this.scope,
        limit: this.limit,
        order: this.order
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
    this.getData()
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
    },
    setIsFollowing (
      value
    ) {
      this.profileData
        .other_profile
        .follower_of_profile = value
    },
    setFollowersCount (
      value
    ) {
      this.profileData.followers_count = value
    }
  }
}
</script>

<style lang="sass" scoped></style>

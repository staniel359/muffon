<template>
  <BasePageContainer
    :responseData="profileData"
    :isLoading="isLoading"
    :error="error"
  >
    <slot
      :profileData="profileData"
      :isLoading="isLoading"
      :error="error"
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
import formatProfilePostsPageTab from '*/helpers/formatters/tabs/profile/posts'
import getProfilePosts from '*/helpers/actions/api/profile/get'

export default {
  name: 'BaseProfilePostsPageContainer',
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
        scope: 'posts'
      }
    },
    profileNicknameFetched () {
      return this.profileData?.nickname
    },
    postsArgs () {
      return {
        profileId: this.profileId,
        scope: 'posts',
        limit: this.limit
      }
    },
    tabData () {
      return formatProfilePostsPageTab(
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
    getProfilePosts,
    fetchData (page) {
      this.getProfilePosts({
        ...this.postsArgs,
        page
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>

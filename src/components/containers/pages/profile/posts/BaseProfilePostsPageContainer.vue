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
      :refresh="refresh"
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
      isLoading: false,
      scope: 'posts'
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
    postsArgs () {
      return {
        profileId: this.profileId,
        scope: this.scope,
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
    getProfilePosts,
    fetchData (page) {
      this.getProfilePosts({
        ...this.postsArgs,
        page
      })
    },
    refresh (page) {
      this.fetchData(page)
    }
  }
}
</script>

<style lang="sass" scoped></style>

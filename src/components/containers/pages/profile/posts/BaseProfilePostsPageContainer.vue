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
        limit: this.responsePageLimit
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

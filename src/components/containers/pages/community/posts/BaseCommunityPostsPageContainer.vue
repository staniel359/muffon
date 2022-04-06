<template>
  <BasePageContainer
    :responseData="communityData"
    :isLoading="isLoading"
    :error="error"
  >
    <slot
      :communityData="communityData"
      :communityCreatorId="communityCreatorId"
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
import formatCommunityPageNavigation
  from '*/helpers/formatters/navigation/community'
import formatCommunityPostsPageTab
  from '*/helpers/formatters/tabs/community/posts'
import getCommunityPosts from '*/helpers/actions/api/community/get'

export default {
  name: 'BaseCommunityPostsPageContainer',
  components: {
    BasePageContainer
  },
  mixins: [
    navigationMixin
  ],
  props: {
    communityId: {
      type: String,
      required: true
    },
    limit: Number
  },
  data () {
    return {
      error: null,
      communityData: null,
      isLoading: false
    }
  },
  computed: {
    navigationSections () {
      return formatCommunityPageNavigation(
        this.navigationData
      )
    },
    navigationData () {
      return {
        communityId: this.communityId,
        communityTitle:
          this.communityTitleFetched,
        scope: 'posts'
      }
    },
    communityTitleFetched () {
      return this.communityData?.title
    },
    postsArgs () {
      return {
        communityId: this.communityId,
        scope: 'posts',
        limit: this.limit
      }
    },
    tabData () {
      return formatCommunityPostsPageTab(
        this.navigationData
      )
    },
    communityCreatorId () {
      return this.communityData?.creator?.id?.toString()
    }
  },
  watch: {
    communityData: 'handleNavigationDataChange'
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    handleRefresh (page) {
      this.fetchData(page)
    },
    getCommunityPosts,
    fetchData (page) {
      this.getCommunityPosts({
        ...this.postsArgs,
        page
      })
    }
  }
}
</script>

<style lang="sass" scoped></style>

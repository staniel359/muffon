<template>
  <BasePageContainer
    :response-data="communityData"
    :is-loading="isLoading"
    :error="error"
  >
    <slot
      :community-data="communityData"
      :community-creator-id="communityCreatorId"
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
      isLoading: false,
      scope: 'posts'
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
        scope: this.scope
      }
    },
    communityTitleFetched () {
      return this.communityData?.title
    },
    postsArgs () {
      return {
        communityId: this.communityId,
        scope: this.scope,
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
    getCommunityPosts,
    fetchData (
      page
    ) {
      this.getCommunityPosts(
        {
          ...this.postsArgs,
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

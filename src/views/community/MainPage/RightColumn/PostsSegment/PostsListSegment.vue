<template>
  <BaseSegmentContainer
    ref="segment"
    class="main-paginated-segment-container"
    :is-loading="isLoading"
  >
    <BasePaginatedListContainer
      :response-data="communityData"
      :scope="scope"
      :limit="limit"
      :is-loading="isLoading"
      :error="error"
      @fetch-data="fetchData"
      @refresh="handleRefresh"
      @focus="handleFocus"
    >
      <template #default="slotProps">
        <BasePostsSimpleList
          :posts="slotProps[scope]"
          :community-id="communityId"
          :community-creator-id="communityCreatorId"
        />
      </template>
    </BasePaginatedListContainer>
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '*/components/containers/segments/BaseSegmentContainer.vue'
import BasePaginatedListContainer
  from '*/components/containers/lists/BasePaginatedListContainer.vue'
import BasePostsSimpleList
  from '*/components/lists/posts/BasePostsSimpleList.vue'
import getCommunityPosts from '*/helpers/actions/api/community/get'

export default {
  name: 'PostsListSegment',
  components: {
    BaseSegmentContainer,
    BasePaginatedListContainer,
    BasePostsSimpleList
  },
  props: {
    communityId: {
      type: String,
      required: true
    },
    communityCreatorId: String
  },
  data () {
    return {
      communityData: null,
      error: null,
      isLoading: false,
      limit: 10,
      scope: 'posts'
    }
  },
  computed: {
    postsArgs () {
      return {
        communityId: this.communityId,
        scope: this.scope,
        limit: this.limit
      }
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    handleFocus () {
      this.$refs
        .segment
        .focus()
    },
    handleRefresh (
      page
    ) {
      this.fetchData(
        page
      )
    },
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
    }
  }
}
</script>

<style lang="sass" scoped></style>

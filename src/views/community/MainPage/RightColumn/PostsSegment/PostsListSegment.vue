<template>
  <BaseSegmentContainer
    ref="segment"
    class="posts-list-segment"
    :isLoading="isLoading"
  >
    <BasePaginatedListContainer
      ref="paginatedContainer"
      scope="posts"
      :isLoading="isLoading"
      :error="error"
      :responseData="communityData"
      :limit="limit"
      @focus="handleFocus"
      @fetchData="fetchData"
      @refresh="handleRefresh"
    >
      <template #default="slotProps">
        <BasePostsSimpleList
          :posts="slotProps.posts"
          :communityId="communityId"
          :communityCreatorId="communityCreatorId"
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
      limit: 10
    }
  },
  computed: {
    postsArgs () {
      return {
        communityId: this.communityId,
        scope: 'posts',
        limit: this.limit
      }
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    handleFocus () {
      this.$refs.segment.focus()
    },
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

<style lang="sass" scoped>
.posts-list-segment
  @extend .d-flex
</style>

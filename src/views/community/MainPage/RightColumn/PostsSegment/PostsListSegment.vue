<template>
  <BasePaginatedSegmentContainer
    ref="segment"
    response-data-name="communityData"
    :slot-props-data="slotPropsData"
    :scope="scope"
    :limit="limit"
    @focus="handleFocus"
  >
    <template #default="slotProps">
      <BasePostsSimpleList
        :posts="slotProps[scope]"
        :community-id="communityId"
        :community-creator-id="communityCreatorId"
      />
    </template>
  </BasePaginatedSegmentContainer>
</template>

<script>
import BasePaginatedSegmentContainer
  from '*/components/containers/segments/BasePaginatedSegmentContainer.vue'
import BasePostsSimpleList
  from '*/components/lists/posts/BasePostsSimpleList.vue'
import getCommunityPosts from '*/helpers/actions/api/community/get'

export default {
  name: 'PostsListSegment',
  components: {
    BasePaginatedSegmentContainer,
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
    communityPostsArgs () {
      return {
        communityId: this.communityId,
        scope: this.scope,
        limit: this.limit
      }
    },
    slotPropsData () {
      return {
        communityData: this.communityData,
        isLoading: this.isLoading,
        error: this.error,
        fetchData: this.fetchData,
        refresh: this.refresh
      }
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    getCommunityPosts,
    handleFocus () {
      this.focus()
    },
    fetchData (
      page
    ) {
      this.getCommunityPosts(
        {
          ...this.communityPostsArgs,
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
    },
    focus () {
      this.$refs
        .segment
        .focus()
    }
  }
}
</script>

<style lang="sass" scoped></style>

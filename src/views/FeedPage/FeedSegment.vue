<template>
  <BaseSegmentContainer
    :class="[
      'raised',
      'main-segment-container',
      'main-paginated-page-segment-container',
      'feed-segment'
    ]"
    :is-loading="isLoading"
    @init="handleInit"
  >
    <BasePaginatedListContainer
      :response-data="profileData"
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
import getFeed from '*/helpers/actions/api/feed/get'

export default {
  name: 'FeedSegment',
  components: {
    BaseSegmentContainer,
    BasePaginatedListContainer,
    BasePostsSimpleList
  },
  data () {
    return {
      segment: null,
      profileData: null,
      error: null,
      isLoading: false,
      limit: 50,
      scope: 'feed'
    }
  },
  computed: {
    feedArgs () {
      return {
        limit: this.limit
      }
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    handleInit (
      element
    ) {
      this.segment = element
    },
    handleRefresh (
      page
    ) {
      this.fetchData(
        page
      )
    },
    handleFocus () {
      this.segment.scrollTo(
        0,
        0
      )
    },
    getFeed,
    fetchData (
      page
    ) {
      this.getFeed(
        {
          ...this.feedArgs,
          page
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.feed-segment
  @extend .flex-full, .overflow-y-auto
  width: 450px
</style>

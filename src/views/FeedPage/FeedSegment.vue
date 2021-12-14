<template>
  <BaseSegmentContainer
    :class="[
      'raised',
      'main-segment-container',
      'main-paginated-page-segment-container',
      'feed-segment'
    ]"
    :isLoading="isLoading"
    @init="handleInit"
  >
    <BasePaginatedListContainer
      ref="paginatedContainer"
      scope="feed"
      :isLoading="isLoading"
      :error="error"
      :responseData="profileData"
      :clientPageLimit="limit"
      :responsePageLimit="limit"
      @focus="handleFocus"
      @fetchData="fetchData"
      @refresh="handleRefresh"
    >
      <template #default="slotProps">
        <BasePostsSimpleList
          :posts="slotProps.feed"
        />
      </template>
    </BasePaginatedListContainer>
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/containers/segments/BaseSegmentContainer.vue'
import BasePaginatedListContainer
  from '@/containers/lists/BasePaginatedListContainer.vue'
import BasePostsSimpleList from '@/lists/posts/BasePostsSimpleList.vue'
import fetchFeedData from '#/actions/api/feed/fetchData'

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
      limit: 50
    }
  },
  computed: {
    feedArgs () {
      return {
        limit: this.limit
      }
    },
    feedData () {
      return this.profileData?.feed
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    handleInit (el) {
      this.segment = el
    },
    handleRefresh (page) {
      this.fetchData(page)
    },
    handleFocus () {
      this.segment.scrollTo(0, 0)
    },
    fetchFeedData,
    fetchData (page) {
      this.fetchFeedData({
        ...this.feedArgs,
        page
      })
    }
  }
}
</script>

<style lang="sass" scoped>
.feed-segment
  @extend .flex-full, .overflow-y-auto
  width: 450px
</style>

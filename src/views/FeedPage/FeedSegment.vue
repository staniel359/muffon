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
    getFeed,
    fetchData (page) {
      this.getFeed({
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

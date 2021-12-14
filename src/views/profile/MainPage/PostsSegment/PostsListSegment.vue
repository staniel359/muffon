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
      :responseData="profileData"
      :clientPageLimit="limit"
      :responsePageLimit="limit"
      @focus="handleFocus"
      @fetchData="fetchData"
      @refresh="handleRefresh"
    >
      <template #default="slotProps">
        <BasePostsSimpleList
          :posts="slotProps.posts"
          :profileId="profileId"
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
import fetchProfilePostsData
  from '#/actions/api/profile/posts/fetchData'

export default {
  name: 'PostsListSegment',
  components: {
    BaseSegmentContainer,
    BasePaginatedListContainer,
    BasePostsSimpleList
  },
  props: {
    profileId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      profileData: null,
      error: null,
      isLoading: false,
      limit: 10
    }
  },
  computed: {
    postsDataArgs () {
      return {
        profileId: this.profileId,
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
    fetchProfilePostsData,
    fetchData (page) {
      this.fetchProfilePostsData({
        ...this.postsDataArgs,
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

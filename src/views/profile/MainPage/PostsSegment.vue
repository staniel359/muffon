<template>
  <div class="ui segments main-segment-container">
    <HeaderSegment
      :profileId="profileId"
    />

    <FormSegment
      :profileId="profileId"
      @add="handleAdd"
    />

    <BaseSegmentContainer
      ref="segment"
      class="posts-segment"
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
  </div>
</template>

<script>
import HeaderSegment from './PostsSegment/HeaderSegment.vue'
import FormSegment from './PostsSegment/FormSegment.vue'
import BaseSegmentContainer
  from '@/containers/segments/BaseSegmentContainer.vue'
import BasePaginatedListContainer
  from '@/containers/lists/BasePaginatedListContainer.vue'
import BasePostsSimpleList from '@/lists/posts/BasePostsSimpleList.vue'
import fetchProfilePostsData
  from '#/actions/api/profile/posts/fetchData'

export default {
  name: 'PostsSegment',
  components: {
    HeaderSegment,
    FormSegment,
    BaseSegmentContainer,
    BasePaginatedListContainer,
    BasePostsSimpleList
  },
  props: {
    profileId: String
  },
  data () {
    return {
      error: null,
      profileData: null,
      isLoading: false,
      limit: 5
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
    handleRefresh (page) {
      this.fetchData(page)
    },
    handleFocus () {
      this.$refs.segment.focus()
    },
    handleAdd () {
      this.$refs.paginatedContainer.reset()

      this.$nextTick(() => {
        this.fetchData()
      })
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
.posts-segment
  @extend .d-flex
</style>

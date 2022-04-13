<template>
  <BaseSegmentContainer
    ref="segment"
    class="main-paginated-segment-container"
    :is-loading="isLoading"
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
          :profile-id="profileId"
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
import getProfilePosts from '*/helpers/actions/api/profile/get'

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
      limit: 10,
      scope: 'posts'
    }
  },
  computed: {
    postsArgs () {
      return {
        profileId: this.profileId,
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
    getProfilePosts,
    fetchData (
      page
    ) {
      this.getProfilePosts(
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

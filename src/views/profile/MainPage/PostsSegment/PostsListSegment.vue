<template>
  <BasePaginatedSegmentContainer
    ref="segment"
    response-data-name="profileData"
    :slot-props-data="slotPropsData"
    :scope="scope"
    :limit="limit"
    @focus="handleFocus"
  >
    <template #default="slotProps">
      <BasePostsSimpleList
        :posts="slotProps[scope]"
        :profile-id="profileId"
      />
    </template>
  </BasePaginatedSegmentContainer>
</template>

<script>
import BasePaginatedSegmentContainer
  from '*/components/containers/segments/BasePaginatedSegmentContainer.vue'
import BasePostsSimpleList
  from '*/components/lists/posts/BasePostsSimpleList.vue'
import getProfilePosts from '*/helpers/actions/api/profile/get'

export default {
  name: 'PostsListSegment',
  components: {
    BasePaginatedSegmentContainer,
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
    profilePostsArgs () {
      return {
        profileId: this.profileId,
        scope: this.scope,
        limit: this.limit
      }
    },
    slotPropsData () {
      return {
        profileData: this.profileData,
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
    getProfilePosts,
    handleFocus () {
      this.focus()
    },
    fetchData (
      page
    ) {
      this.getProfilePosts(
        {
          ...this.profilePostsArgs,
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

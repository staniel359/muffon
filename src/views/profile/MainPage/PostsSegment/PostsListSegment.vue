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
import paginatedSegmentMixin from '*/mixins/paginatedSegmentMixin'

export default {
  name: 'PostsListSegment',
  components: {
    BasePaginatedSegmentContainer,
    BasePostsSimpleList
  },
  mixins: [
    paginatedSegmentMixin
  ],
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
        error: this.error
      }
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getProfilePosts,
    getData (
      {
        page
      } = {}
    ) {
      this.getProfilePosts(
        {
          ...this.profilePostsArgs,
          page
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>

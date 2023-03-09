<template>
  <BasePaginatedSegmentContainer
    ref="segment"
    :response-data="profileData"
    :is-loading="isLoading"
    :error="error"
    :scope="scope"
    :limit="limit"
    @focus="handleFocus"
  >
    <template
      #default="slotProps"
    >
      <BasePostsSimpleList
        :posts="slotProps[scope]"
        :profile-id="profileId"
      />
    </template>
  </BasePaginatedSegmentContainer>
</template>

<script>
import BasePaginatedSegmentContainer
  from '@/components/containers/segments/BasePaginatedSegmentContainer.vue'
import BasePostsSimpleList
  from '@/components/lists/posts/BasePostsSimpleList.vue'
import getProfilePosts from '@/helpers/actions/api/profile/get'
import paginatedSegmentMixin from '@/mixins/paginatedSegmentMixin'
import {
  posts as postsLimits
} from '@/helpers/data/limits'

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
      limit:
        postsLimits.simple.small,
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

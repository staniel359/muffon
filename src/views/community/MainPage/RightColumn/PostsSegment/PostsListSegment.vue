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
        error: this.error
      }
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getCommunityPosts,
    getData (
      {
        page
      } = {}
    ) {
      this.getCommunityPosts(
        {
          ...this.communityPostsArgs,
          page
        }
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>

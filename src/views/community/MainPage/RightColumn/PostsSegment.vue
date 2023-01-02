<template>
  <BaseHeaderSegmentsContainer
    scope="posts"
    :header-link="headerLink"
  >
    <BasePostsFormSegment
      :key="key"
      post-type="community"
      :community-id="communityId"
      :is-with-as-community-option="isCommunityCreator"
      @success="handlePostCreateSuccess"
    />

    <PostsListSegment
      :key="key"
      :community-id="communityId"
      :is-community-creator="isCommunityCreator"
    />
  </BaseHeaderSegmentsContainer>
</template>

<script>
import BaseHeaderSegmentsContainer
  from '@/components/containers/segments/BaseHeaderSegmentsContainer.vue'
import BasePostsFormSegment
  from '@/components/segments/posts/BasePostsFormSegment.vue'
import PostsListSegment from './PostsSegment/PostsListSegment.vue'
import {
  generateKey
} from '#/helpers/utils'
import {
  posts as formatCommunityPostsLink
} from '@/helpers/formatters/links/community'

export default {
  name: 'PostsSegment',
  components: {
    BaseHeaderSegmentsContainer,
    BasePostsFormSegment,
    PostsListSegment
  },
  props: {
    communityId: {
      type: String,
      required: true
    },
    isCommunityCreator: Boolean
  },
  data () {
    return {
      key: null
    }
  },
  computed: {
    headerLink () {
      return formatCommunityPostsLink(
        {
          communityId: this.communityId
        }
      )
    }
  },
  methods: {
    handlePostCreateSuccess () {
      this.key = generateKey()
    }
  }
}
</script>

<style lang="sass" scoped></style>

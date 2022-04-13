<template>
  <div class="ui raised segments main-segment-container">
    <BaseHeaderSegment
      scope="posts"
      :link="headerLink"
    />

    <BasePostsFormSegment
      post-type="community"
      :community-id="communityId"
      :is-with-as-community-option="isCommunityCreator"
      @success="handlePostCreateSuccess"
    />

    <PostsListSegment
      :key="key"
      :community-id="communityId"
      :community-creator-id="communityCreatorId"
    />
  </div>
</template>

<script>
import BaseHeaderSegment from '*/components/segments/BaseHeaderSegment.vue'
import BasePostsFormSegment
  from '*/components/segments/posts/BasePostsFormSegment.vue'
import PostsListSegment from './PostsSegment/PostsListSegment.vue'
import {
  generateKey
} from '*/helpers/utils'
import {
  posts as formatCommunityPostsLink
} from '*/helpers/formatters/links/community'

export default {
  name: 'PostsSegment',
  components: {
    BaseHeaderSegment,
    BasePostsFormSegment,
    PostsListSegment
  },
  props: {
    communityId: {
      type: String,
      required: true
    },
    currentProfileId: {
      type: String,
      required: true
    },
    communityCreatorId: String
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
    },
    isCommunityCreator () {
      return (
        this.currentProfileId ===
          this.communityCreatorId
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

<style lang="sass" scoped>

</style>

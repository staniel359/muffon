<template>
  <div class="ui raised segments main-segment-container">
    <BaseHeaderSegment
      scope="posts"
      :link="headerLink"
    />

    <BasePostsFormSegment
      postType="community"
      :communityId="communityId"
      :isWithAsCommunityOption="isCommunityCreator"
      @success="handleSuccess"
    />

    <PostsListSegment
      :key="key"
      :communityId="communityId"
      :communityCreatorId="communityCreatorId"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import BaseHeaderSegment from '*/components/segments/BaseHeaderSegment.vue'
import BasePostsFormSegment
  from '*/components/segments/posts/BasePostsFormSegment.vue'
import PostsListSegment from './PostsSegment/PostsListSegment.vue'
import { generateKey } from '*/helpers/utils'
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
    communityCreatorId: String
  },
  data () {
    return {
      key: null
    }
  },
  computed: {
    ...mapState('profile', {
      profileInfo: 'info'
    }),
    headerLink () {
      return formatCommunityPostsLink({
        communityId: this.communityId
      })
    },
    isCommunityCreator () {
      return (
        this.currentProfileId ===
          this.communityCreatorId
      )
    },
    currentProfileId () {
      return this.profileInfo.id.toString()
    }
  },
  methods: {
    handleSuccess () {
      this.key = generateKey()
    }
  }
}
</script>

<style lang="sass" scoped>

</style>

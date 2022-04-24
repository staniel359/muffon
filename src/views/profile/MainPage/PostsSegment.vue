<template>
  <BaseProfileSegmentContainer
    scope="posts"
    :header-link="headerLink"
    :is-get-data="false"
  >
    <BasePostsFormSegment
      post-type="profile"
      :profile-id="profileId"
      @success="handlePostCreateSuccess"
    />

    <PostsListSegment
      :key="key"
      :profile-id="profileId"
    />
  </BaseProfileSegmentContainer>
</template>

<script>
import BaseProfileSegmentContainer
  from '*/components/containers/segments/profile/BaseProfileSegmentContainer.vue'
import BasePostsFormSegment
  from '*/components/segments/posts/BasePostsFormSegment.vue'
import PostsListSegment from './PostsSegment/PostsListSegment.vue'
import {
  generateKey
} from '*/helpers/utils'
import {
  posts as formatProfilePostsLink
} from '*/helpers/formatters/links/profile'

export default {
  name: 'PostsSegment',
  components: {
    BaseProfileSegmentContainer,
    BasePostsFormSegment,
    PostsListSegment
  },
  props: {
    profileId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      key: null
    }
  },
  computed: {
    headerLink () {
      return formatProfilePostsLink(
        {
          profileId: this.profileId
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

<style lang="sass" scoped>

</style>

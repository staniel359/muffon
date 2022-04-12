<template>
  <BaseProfileSegmentContainer
    scope="posts"
    :headerLink="headerLink"
    :isFetchData="false"
  >
    <template #default>
      <BasePostsFormSegment
        postType="profile"
        :profileId="profileId"
        @success="handlePostCreateSuccess"
      />

      <PostsListSegment
        :key="key"
        :profileId="profileId"
      />
    </template>
  </BaseProfileSegmentContainer>
</template>

<script>
import BaseProfileSegmentContainer
  from '*/components/containers/segments/profile/BaseProfileSegmentContainer.vue'
import BasePostsFormSegment
  from '*/components/segments/posts/BasePostsFormSegment.vue'
import PostsListSegment from './PostsSegment/PostsListSegment.vue'
import { generateKey } from '*/helpers/utils'
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
      return formatProfilePostsLink({
        profileId: this.profileId
      })
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

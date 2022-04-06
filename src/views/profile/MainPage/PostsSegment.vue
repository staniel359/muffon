<template>
  <div class="ui raised segments main-segment-container">
    <BaseHeaderSegment
      scope="posts"
      :link="headerLink"
    />

    <BasePostsFormSegment
      postType="profile"
      :profileId="profileId"
      @success="handleSuccess"
    />

    <PostsListSegment
      :key="key"
      :profileId="profileId"
    />
  </div>
</template>

<script>
import BaseHeaderSegment from '*/components/segments/BaseHeaderSegment.vue'
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
    BaseHeaderSegment,
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
    handleSuccess () {
      this.key = generateKey()
    }
  }
}
</script>

<style lang="sass" scoped>

</style>

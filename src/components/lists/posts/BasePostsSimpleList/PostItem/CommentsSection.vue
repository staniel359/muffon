<template>
  <BasePostCommentsSimpleList
    ref="list"
    :comments="comments"
    :is-community-creator="isCommunityCreator"
    :is-paginated="false"
    is-with-top-divider
  />

  <BasePostCommentFormSection
    :key="key"
    class="main-bottom-large-section"
    :model="model"
    :profile-id="otherProfileId"
    :community-id="communityId"
    :post-id="postId"
    :is-with-as-community-option="isCommunityCreator"
    @success="handlePostCommentSuccess"
  />
</template>

<script>
import BasePostCommentsSimpleList
  from '@/components/lists/post/comments/BasePostCommentsSimpleList.vue'
import BasePostCommentFormSection
  from '@/components/sections/post/comment/BasePostCommentFormSection.vue'
import {
  generateKey
} from '@/helpers/utils'

export default {
  name: 'CommentsSection',
  components: {
    BasePostCommentsSimpleList,
    BasePostCommentFormSection
  },
  props: {
    postData: {
      type: Object,
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
    comments () {
      return this.postData.comments
    },
    model () {
      if (this.isCommunityPost) {
        return 'community'
      } else if (this.isOtherProfilePost) {
        return 'profile'
      } else {
        return null
      }
    },
    isCommunityPost () {
      return !!this.communityData
    },
    communityData () {
      return this.postData.community
    },
    isOtherProfilePost () {
      return !!this.otherProfileData
    },
    otherProfileData () {
      return this.postData.other_profile
    },
    otherProfileId () {
      return this.otherProfileData?.id
    },
    communityId () {
      return this.communityData?.id
    },
    postId () {
      return this.postData.id
    }
  },
  methods: {
    handlePostCommentSuccess (
      value
    ) {
      this.addCommentToComments(
        value
      )

      this.refreshForm()
    },
    addCommentToComments (
      value
    ) {
      this.$refs
        .list
        .addCommentToComments(
          value
        )
    },
    refreshForm () {
      this.key = generateKey()
    }
  }
}
</script>

<style lang="sass" scoped></style>

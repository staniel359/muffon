<template>
  <template
    v-if="comments.length"
  >
    <BaseDivider
      class="large"
    />

    <BasePostCommentsSimpleList
      :comments="comments"
      :is-community-creator="isCommunityCreator"
      :is-paginated="false"
    />
  </template>

  <div class="main-bottom-large-section">
    <BasePostCommentFormSegment
      :key="key"
      :model="model"
      :profile-id="otherProfileId"
      :community-id="communityId"
      :post-id="postId"
      :is-with-as-community-option="isCommunityCreator"
      @success="handlePostCommentSuccess"
    />
  </div>
</template>

<script>
import BaseDivider from '@/components/BaseDivider.vue'
import BasePostCommentsSimpleList
  from '@/components/lists/post/comments/BasePostCommentsSimpleList.vue'
import BasePostCommentFormSegment
  from '@/components/segments/post/comment/BasePostCommentFormSegment.vue'
import {
  generateKey
} from '@/helpers/utils'

export default {
  name: 'CommentsSection',
  components: {
    BaseDivider,
    BasePostCommentsSimpleList,
    BasePostCommentFormSegment
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
      key: null,
      comments: null
    }
  },
  computed: {
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
      return this.otherProfileData
        ?.id
        ?.toString()
    },
    communityId () {
      return this.communityData
        ?.id
        ?.toString()
    },
    postId () {
      return this.postData.id.toString()
    }
  },
  beforeMount () {
    this.comments =
      this.postData.comments
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
      this.comments = [
        ...this.comments,
        value
      ]
    },
    refreshForm () {
      this.key = generateKey()
    }
  }
}
</script>

<style lang="sass" scoped></style>

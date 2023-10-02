<template>
  <BaseDeleteModal
    ref="modal"
    model-type="comment"
    :is-loading="isLoading"
    :error="error"
    @delete-button-click="handleDeleteButtonClick"
  />
</template>

<script>
import BaseDeleteModal from '@/components/modals/BaseDeleteModal.vue'
import deleteProfilePostComment
  from '@/helpers/actions/api/profile/post/comment/delete'
import deleteCommunityPostComment
  from '@/helpers/actions/api/community/post/comment/delete'

export default {
  name: 'BasePostCommentDeleteModal',
  components: {
    BaseDeleteModal
  },
  props: {
    commentData: {
      type: Object,
      required: true
    }
  },
  emits: [
    'success'
  ],
  data () {
    return {
      error: null,
      isLoading: false,
      isSuccess: false
    }
  },
  computed: {
    profileId () {
      return this.otherProfileData?.id
    },
    otherProfileData () {
      return this.postData.profile
    },
    postData () {
      return this.commentData.post
    },
    communityId () {
      return this.communityData?.id
    },
    communityData () {
      return this.postData.community
    },
    postId () {
      return this.postData.id
    },
    commentId () {
      return this.commentData.id
    },
    deleteArgs () {
      return {
        profileId: this.profileId,
        communityId: this.communityId,
        postId: this.postId,
        commentId: this.commentId
      }
    },
    model () {
      if (this.otherProfileData) {
        return 'profile'
      } else if (this.communityData) {
        return 'community'
      } else {
        return null
      }
    }
  },
  watch: {
    isSuccess: 'handleIsSuccessChange'
  },
  methods: {
    deleteProfilePostComment,
    deleteCommunityPostComment,
    handleDeleteButtonClick () {
      this.deletePostComment()
    },
    handleIsSuccessChange (
      value
    ) {
      if (value) {
        this.hide()

        this.$emit(
          'success'
        )
      }
    },
    deletePostComment () {
      switch (this.model) {
        case 'profile':
          return this.deleteProfilePostComment(
            this.deleteArgs
          )
        case 'community':
          return this.deleteCommunityPostComment(
            this.deleteArgs
          )
        default:
          return null
      }
    },
    show () {
      this.$refs
        .modal
        .show()
    },
    hide () {
      this.$refs
        .modal
        .hide()
    }
  }
}
</script>

<style lang="sass" scoped></style>

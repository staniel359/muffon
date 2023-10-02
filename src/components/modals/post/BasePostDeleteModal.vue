<template>
  <BaseDeleteModal
    ref="modal"
    model-type="post"
    :is-loading="isLoading"
    :error="error"
    @delete-button-click="handleDeleteButtonClick"
  />
</template>

<script>
import BaseDeleteModal from '@/components/modals/BaseDeleteModal.vue'
import deleteProfilePost from '@/helpers/actions/api/profile/post/delete'
import deleteCommunityPost from '@/helpers/actions/api/community/post/delete'

export default {
  name: 'BasePostDeleteModal',
  components: {
    BaseDeleteModal
  },
  props: {
    postData: {
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
    postId () {
      return this.postData.id
    },
    postType () {
      return this.postData.post_type
    },
    communityId () {
      return this.postData.community?.id
    },
    deleteArgs () {
      return {
        communityId: this.communityId,
        postId: this.postId
      }
    }
  },
  watch: {
    isSuccess: 'handleIsSuccessChange'
  },
  methods: {
    handleDeleteButtonClick () {
      this.deletePost()
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
    deleteProfilePost,
    deleteCommunityPost,
    deletePost () {
      switch (this.postType) {
        case 'profile':
          return this.deleteProfilePost(
            this.deleteArgs
          )
        case 'community':
          return this.deleteCommunityPost(
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

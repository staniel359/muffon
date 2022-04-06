<template>
  <BaseDeleteModal
    ref="modal"
    modelType="post"
    :isLoading="isLoading"
    :error="error"
    @deleteButtonClick="handleDeleteButtonClick"
  />
</template>

<script>
import BaseDeleteModal from '*/components/modals/BaseDeleteModal.vue'
import deleteProfilePost from '*/helpers/actions/api/profile/post/delete'
import deleteCommunityPost from '*/helpers/actions/api/community/post/delete'

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
    'deleted'
  ],
  data () {
    return {
      error: null,
      isLoading: false
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
  methods: {
    handleDeleteButtonClick () {
      this.deletePost().then(
        this.handleSuccess
      )
    },
    handleSuccess () {
      this.$refs.modal.hide()

      this.$emit('deleted')
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
      this.$refs.modal.show()
    }
  }
}
</script>

<style lang="sass" scoped>
.error-message
  margin-top: 1em !important
</style>

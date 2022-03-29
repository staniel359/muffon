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
import deletePost from '*/helpers/actions/api/post/delete'

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
    deleteArgs () {
      return {
        postId: this.postId
      }
    }
  },
  methods: {
    handleDeleteButtonClick () {
      this.deletePost(
        this.deleteArgs
      ).then(
        this.handleSuccess
      )
    },
    handleSuccess () {
      this.$refs.modal.hide()

      this.$emit('deleted')
    },
    deletePost,
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

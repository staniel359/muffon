<template>
  <BaseDeleteModal
    ref="modal"
    modelType="bookmark"
    :model="model"
    :modelName="modelName"
    :isLoading="isLoading"
    :error="error"
    @deleteButtonClick="handleDeleteButtonClick"
  />
</template>

<script>
import BaseDeleteModal from '*/components/modals/BaseDeleteModal.vue'
import deleteBookmark from '*/helpers/actions/api/bookmark/model/delete'

export default {
  name: 'BaseBookmarkDeleteModal',
  components: {
    BaseDeleteModal
  },
  props: {
    model: {
      type: String,
      required: true
    },
    modelData: {
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
    modelName () {
      switch (this.model) {
        case 'artist':
          return this.modelData.name
        default:
          return [
            this.modelData.artist.name,
            this.modelData.title
          ].join(' - ')
      }
    },
    deleteArgs () {
      return {
        model: this.model,
        bookmarkId: this.bookmarkId
      }
    },
    bookmarkId () {
      return this.modelData.id
    }
  },
  methods: {
    handleDeleteButtonClick () {
      this.deleteBookmark(
        this.deleteArgs
      ).then(
        this.handleSuccess
      )
    },
    handleSuccess () {
      this.$emit('deleted')

      this.$refs.modal.hide()
    },
    deleteBookmark,
    show () {
      this.$refs.modal.show()
    }
  }
}
</script>

<style lang="sass" scoped></style>

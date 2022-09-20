<template>
  <BaseDeleteModal
    ref="modal"
    model-type="bookmark"
    :model="model"
    :model-name="modelName"
    :is-loading="isLoading"
    :error="error"
    @delete-button-click="handleDeleteButtonClick"
  />
</template>

<script>
import BaseDeleteModal from '@/components/modals/BaseDeleteModal.vue'
import deleteBookmark from '@/helpers/actions/api/bookmark/model/delete'

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
    modelName () {
      switch (this.model) {
        case 'artist':
          return this.modelData.name
        default:
          return [
            this.modelData.artist.name,
            this.modelData.title
          ].join(
            ' - '
          )
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
  watch: {
    isSuccess: 'handleIsSuccessChange'
  },
  methods: {
    deleteBookmark,
    handleDeleteButtonClick () {
      this.deleteBookmark(
        this.deleteArgs
      )
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

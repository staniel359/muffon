<template>
  <BaseDeleteModal
    ref="modal"
    model-type="favorite"
    :model="model"
    :model-name="modelName"
    :is-loading="isLoading"
    :error="error"
    @delete-button-click="handleDeleteButtonClick"
  />
</template>

<script>
import BaseDeleteModal from '@/components/modals/BaseDeleteModal.vue'
import deleteFavorite from '@/helpers/actions/api/favorite/model/delete'

export default {
  name: 'BaseFavoriteDeleteModal',
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
        case 'video':
          return this.modelData.title
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
        favoriteId: this.favoriteId
      }
    },
    favoriteId () {
      return this.modelData.id
    }
  },
  watch: {
    isSuccess: 'handleIsSuccessChange'
  },
  methods: {
    deleteFavorite,
    handleDeleteButtonClick () {
      this.deleteFavorite(
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

<template>
  <BaseDeleteModal
    ref="modal"
    modelType="favorite"
    :model="model"
    :modelName="modelName"
    :isLoading="isLoading"
    :error="error"
    @deleteButtonClick="handleDeleteButtonClick"
  />
</template>

<script>
import BaseDeleteModal from '*/components/modals/BaseDeleteModal.vue'
import deleteProfileFavorite
  from '*/helpers/actions/api/profile/favorites/model/delete'

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
    favoriteId () {
      return this.modelData.id
    },
    deleteArgs () {
      return {
        model: this.model,
        favoriteId: this.favoriteId
      }
    }
  },
  methods: {
    handleDeleteButtonClick () {
      this.deleteProfileFavorite(
        this.deleteArgs
      ).then(
        this.handleSuccess
      )
    },
    handleSuccess () {
      this.$refs.modal.hide()

      this.$emit('deleted')
    },
    deleteProfileFavorite,
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

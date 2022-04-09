<template>
  <BaseDeleteModal
    ref="modal"
    modelType="library"
    :model="model"
    :modelName="modelName"
    :isLoading="isLoading"
    :error="error"
    :isWithAlsoText="isWithAlsoText"
    @deleteButtonClick="handleDeleteButtonClick"
  />
</template>

<script>
import BaseDeleteModal from '*/components/modals/BaseDeleteModal.vue'
import deleteLibraryModel from '*/helpers/actions/api/library/model/delete'
import {
  main as formatProfileLibraryMainLink
} from '*/helpers/formatters/links/profile/library'
import { setToast } from '*/helpers/actions/plugins/semantic'

export default {
  name: 'BaseProfileLibraryDeleteModal',
  components: {
    BaseDeleteModal
  },
  props: {
    profileId: {
      type: String,
      required: true
    },
    model: {
      type: String,
      required: true
    },
    modelId: {
      type: String,
      required: true
    },
    modelName: {
      type: String,
      required: true
    },
    isDeleteWithRedirect: Boolean
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
    deletedMessage () {
      return this.$t(
        'notifications.deleted.library',
        { modelName: this.modelNameStrong }
      )
    },
    modelNameStrong () {
      return `<strong>${this.modelName}</strong>`
    },
    profileLibraryMainLink () {
      return formatProfileLibraryMainLink({
        profileId: this.profileId
      })
    },
    isWithAlsoText () {
      return (
        this.model === 'artist' ||
          this.model === 'album'
      )
    },
    deleteArgs () {
      return {
        model: this.model,
        modelId: this.modelId
      }
    }
  },
  methods: {
    handleDeleteButtonClick () {
      this.deleteLibraryModel(
        this.deleteArgs
      ).then(
        this.handleSuccess
      )
    },
    handleSuccess () {
      this.$refs.modal.hide()

      if (this.isDeleteWithRedirect) {
        this.redirect()
        this.notify()
      } else {
        this.$emit('deleted')
      }
    },
    deleteLibraryModel,
    redirect () {
      this.$router.push(
        this.profileLibraryMainLink
      )
    },
    notify () {
      setToast({
        message: this.deletedMessage,
        icon: 'green check'
      })
    },
    show () {
      this.$refs.modal.show()
    }
  }
}
</script>

<style lang="sass" scoped>
.error-message
  @extend .no-margin
  margin-top: 1em !important
</style>

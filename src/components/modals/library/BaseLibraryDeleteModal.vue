<template>
  <BaseDeleteModal
    ref="modal"
    model-type="library"
    :model="model"
    :model-name="modelName"
    :is-loading="isLoading"
    :error="error"
    :is-with-also-text="isWithAlsoText"
    @delete-button-click="handleDeleteButtonClick"
  />
</template>

<script>
import BaseDeleteModal from '@/components/modals/BaseDeleteModal.vue'
import deleteLibraryModel from '@/helpers/actions/api/library/model/delete'
import {
  main as formatProfileLibraryMainLink
} from '@/helpers/formatters/links/profile/library'
import {
  setToast
} from '@/helpers/actions/plugins/semantic'

export default {
  name: 'BaseLibraryDeleteModal',
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
    deletedMessage () {
      return this.$t(
        'notifications.deleted.library',
        {
          modelName: this.modelNameStrong
        }
      )
    },
    modelNameStrong () {
      return `<strong>${this.modelName}</strong>`
    },
    profileLibraryMainLink () {
      return formatProfileLibraryMainLink(
        {
          profileId: this.profileId
        }
      )
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
  watch: {
    isSuccess: 'handleIsSuccessChange'
  },
  methods: {
    deleteLibraryModel,
    handleDeleteButtonClick () {
      this.deleteLibraryModel(
        this.deleteArgs
      )
    },
    handleIsSuccessChange (
      value
    ) {
      if (value) {
        this.hide()

        if (this.isDeleteWithRedirect) {
          this.redirect()

          this.notify()
        } else {
          this.$emit(
            'success'
          )
        }
      }
    },
    redirect () {
      this.$router.push(
        this.profileLibraryMainLink
      )
    },
    notify () {
      setToast(
        {
          message: this.deletedMessage,
          icon: 'green check'
        }
      )
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

<style lang="sass" scoped>
.error-message
  margin-top: 1em !important
</style>

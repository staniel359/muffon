<template>
  <BaseModalContainer ref="modal">
    <template #default>
      <div class="header">
        {{ headerFormatted }}
      </div>

      <div class="content">
        <TextSection
          :model="model"
          :modelTitle="modelTitle"
        />

        <BaseError
          v-if="error"
          class="error-message"
          :error="error"
        />
      </div>

      <div class="actions">
        <BaseButton
          class="cancel"
          :text="cancelFormatted"
        />

        <BaseButton
          class="red"
          :text="deleteFormatted"
          :class="{ loading: isLoading }"
          @click="handleDeleteButtonClick"
        />
      </div>
    </template>
  </BaseModalContainer>
</template>

<script>
import BaseModalContainer from '@/containers/BaseModalContainer.vue'
import TextSection from './BaseProfileLibraryDeleteModal/TextSection.vue'
import BaseError from '@/BaseErrorMessage.vue'
import BaseButton from '@/buttons/BaseButton.vue'
import deleteProfileLibraryModelData
  from '#/actions/api/profile/library/model/deleteData'
import {
  main as formatProfileLibraryMainLink
} from '#/formatters/links/profile/library'
import { setToast } from '#/actions/plugins/semantic'

export default {
  name: 'BaseProfileLibraryDeleteModal',
  components: {
    BaseModalContainer,
    TextSection,
    BaseError,
    BaseButton
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
    modelTitle: {
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
      isLoading: false,
      isSuccess: false
    }
  },
  computed: {
    headerFormatted () {
      return this.$t(
        `shared.library.delete.${this.model}.header`
      )
    },
    cancelFormatted () {
      return this.$t(
        'buttons.cancel'
      )
    },
    deleteFormatted () {
      return this.$t(
        'buttons.delete'
      )
    },
    toastMessage () {
      return this.$t(
        'shared.library.deleted',
        { modelTitle: this.modelTitleFormatted }
      )
    },
    modelTitleFormatted () {
      return `<strong>${this.modelTitle}</strong>`
    },
    callbackUrl () {
      return formatProfileLibraryMainLink({
        profileId: this.profileId
      })
    }
  },
  watch: {
    isSuccess: 'handleIsSuccessChange'
  },
  methods: {
    deleteProfileLibraryModelData,
    handleDeleteButtonClick () {
      this.deleteProfileLibraryModelData({
        model: this.model,
        modelId: this.modelId
      })
    },
    handleIsSuccessChange () {
      this.$refs.modal.hide()

      if (this.isDeleteWithRedirect) {
        this.$router.push(
          this.callbackUrl
        )

        setToast({
          message: this.toastMessage,
          icon: 'green check'
        })
      } else {
        this.$emit('deleted')
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
  @extend .no-margin
  margin-top: 1em !important
</style>

<template>
  <BaseModalContainer ref="modal">
    <template #default>
      <div class="header">
        {{ headerText }}
      </div>

      <div class="content">
        <TextSection
          :model="model"
          :modelTitle="modelTitle"
        />

        <BaseErrorMessage
          v-if="error"
          class="error-message"
          :error="error"
        />
      </div>

      <div class="actions">
        <BaseButton
          class="cancel"
          :text="cancelText"
        />

        <BaseButton
          class="red"
          :text="deleteText"
          :class="{ loading: isLoading }"
          @click="handleDeleteButtonClick"
        />
      </div>
    </template>
  </BaseModalContainer>
</template>

<script>
import BaseModalContainer from '@/containers/modals/BaseModalContainer.vue'
import TextSection from './BaseProfileLibraryDeleteModal/TextSection.vue'
import BaseErrorMessage from '@/messages/BaseErrorMessage.vue'
import BaseButton from '@/buttons/BaseButton.vue'
import deleteLibraryModel from '#/actions/api/library/model/delete'
import {
  main as formatProfileLibraryMainLink
} from '#/formatters/links/profile/library'
import { setToast } from '#/actions/plugins/semantic'

export default {
  name: 'BaseProfileLibraryDeleteModal',
  components: {
    BaseModalContainer,
    TextSection,
    BaseErrorMessage,
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
    headerText () {
      return this.$t(
        `shared.library.delete.${this.model}.header`
      )
    },
    cancelText () {
      return this.$t(
        'buttons.cancel'
      )
    },
    deleteText () {
      return this.$t(
        'buttons.delete'
      )
    },
    toastMessage () {
      return this.$t(
        'shared.library.deleted',
        { modelTitle: this.modelTitleStrong }
      )
    },
    modelTitleStrong () {
      return `<strong>${this.modelTitle}</strong>`
    },
    profileLibraryMainLink () {
      return formatProfileLibraryMainLink({
        profileId: this.profileId
      })
    }
  },
  watch: {
    isSuccess: 'handleIsSuccessChange'
  },
  methods: {
    deleteLibraryModel,
    handleDeleteButtonClick () {
      this.deleteLibraryModel({
        model: this.model,
        modelId: this.modelId
      })
    },
    handleIsSuccessChange () {
      this.$refs.modal.hide()

      if (this.isDeleteWithRedirect) {
        this.$router.push(
          this.profileLibraryMainLink
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

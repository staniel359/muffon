<template>
  <BaseModalContainer
    ref="modal"
    is-multiple
    @visible="handleVisible"
  >
    <div class="content">
      <BasePlaylistCreateFormContainer
        :image="image"
        :is-with-redirect="isWithRedirect"
        @success="handleSuccess"
      >
        <div class="main-form-extra-section">
          <BaseImageField
            class="main-form-image-field"
            model="playlist"
            @change="handleImageChange"
          />

          <div class="main-form-extra-section-fields-section">
            <BaseTitleField
              ref="title"
            />

            <BaseDescriptionField
              @submit="handleSubmit"
            />

            <BasePrivateField
              model="playlist"
            />
          </div>
        </div>

        <div class="main-form-submit-button-container">
          <BaseSubmitButton
            ref="submit"
            action-key="create"
          />
        </div>
      </BasePlaylistCreateFormContainer>
    </div>
  </BaseModalContainer>
</template>

<script>
import BaseModalContainer
  from '@/components/containers/modals/BaseModalContainer.vue'
import BasePlaylistCreateFormContainer
  from '@/components/containers/forms/playlist/BasePlaylistCreateFormContainer.vue'
import BaseImageField from '@/components/fields/BaseImageField.vue'
import BaseTitleField from '@/components/fields/BaseTitleField.vue'
import BaseDescriptionField from '@/components/fields/BaseDescriptionField.vue'
import BasePrivateField from '@/components/fields/BasePrivateField.vue'
import BaseSubmitButton from '@/components/buttons/BaseSubmitButton.vue'

export default {
  name: 'BasePlaylistCreateModal',
  components: {
    BaseModalContainer,
    BasePlaylistCreateFormContainer,
    BaseImageField,
    BaseTitleField,
    BaseDescriptionField,
    BasePrivateField,
    BaseSubmitButton
  },
  props: {
    isWithRedirect: Boolean
  },
  emits: [
    'success'
  ],
  data () {
    return {
      image: {}
    }
  },
  methods: {
    handleVisible () {
      this.focusTitle()
    },
    handleImageChange (
      value
    ) {
      this.image = value
    },
    handleSubmit () {
      this.clickSubmit()
    },
    handleSuccess () {
      this.hide()

      this.$emit(
        'success'
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
    },
    focusTitle () {
      this.$refs
        .title
        .focus()
    },
    clickSubmit () {
      this.$refs
        .submit
        .click()
    }
  }
}
</script>

<style lang="sass" scoped></style>

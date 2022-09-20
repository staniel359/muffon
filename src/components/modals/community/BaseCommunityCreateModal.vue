<template>
  <BaseModalContainer
    ref="modal"
    @visible="handleVisible"
  >
    <div class="content">
      <BaseCommunityCreateFormContainer
        class="main-community-form"
        :image="image"
        @success="handleSuccess"
      >
        <div class="fields-container">
          <BaseImageField
            class="image-field"
            model="community"
            @change="handleImageChange"
          />

          <div class="fields-right-column">
            <BaseTitleField
              ref="title"
            />

            <BaseDescriptionField
              @submit="handleSubmit"
            />
          </div>
        </div>

        <div class="submit-button-container">
          <BaseSubmitButton
            ref="submit"
            action-key="create"
          />
        </div>
      </BaseCommunityCreateFormContainer>
    </div>
  </BaseModalContainer>
</template>

<script>
import BaseModalContainer
  from '@/components/containers/modals/BaseModalContainer.vue'
import BaseCommunityCreateFormContainer
  from '@/components/containers/forms/community/BaseCommunityCreateFormContainer.vue'
import BaseImageField from '@/components/fields/BaseImageField.vue'
import BaseTitleField from '@/components/fields/BaseTitleField.vue'
import BaseDescriptionField from '@/components/fields/BaseDescriptionField.vue'
import BaseSubmitButton from '@/components/buttons/BaseSubmitButton.vue'

export default {
  name: 'BaseCommunityCreateModal',
  components: {
    BaseModalContainer,
    BaseCommunityCreateFormContainer,
    BaseImageField,
    BaseTitleField,
    BaseDescriptionField,
    BaseSubmitButton
  },
  data () {
    return {
      image: {}
    }
  },
  methods: {
    handleVisible () {
      this.focusTitleInput()
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
    focusTitleInput () {
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

<template>
  <BaseModalContainer ref="modal">
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
            <BaseTitleField ref="title" />

            <BaseDescriptionField />
          </div>
        </div>

        <div class="submit-button-container">
          <BaseSubmitButton
            action-key="create"
          />
        </div>
      </BaseCommunityCreateFormContainer>
    </div>
  </BaseModalContainer>
</template>

<script>
import BaseModalContainer
  from '*/components/containers/modals/BaseModalContainer.vue'
import BaseCommunityCreateFormContainer
  from '*/components/containers/forms/community/BaseCommunityCreateFormContainer.vue'
import BaseImageField from '*/components/fields/BaseImageField.vue'
import BaseTitleField from '*/components/fields/BaseTitleField.vue'
import BaseDescriptionField from '*/components/fields/BaseDescriptionField.vue'
import BaseSubmitButton from '*/components/buttons/BaseSubmitButton.vue'

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
    handleImageChange (
      value
    ) {
      this.image = value
    },
    handleSuccess () {
      this.$refs
        .modal
        .hide()
    },
    show () {
      this.$refs
        .modal
        .show()

      this.$refs
        .title
        .focus()
    }
  }
}
</script>

<style lang="sass" scoped></style>

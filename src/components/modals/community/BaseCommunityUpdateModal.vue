<template>
  <BaseModalContainer
    ref="modal"
    @visible="handleVisible"
  >
    <div class="content">
      <BaseCommunityUpdateFormContainer
        :community-id="communityId"
        :image="image"
        @success="handleSuccess"
      >
        <div class="main-form-extra-section">
          <BaseImageField
            class="main-form-image-field"
            model="community"
            :value="imageData?.medium"
            @change="handleImageChange"
          />

          <div class="main-form-extra-section-fields-section">
            <BaseTitleField
              ref="title"
              :value="communityTitle"
            />

            <BaseDescriptionField
              :value="description"
              @submit="handleSubmit"
            />
          </div>
        </div>

        <div class="main-form-submit-button-container">
          <BaseSubmitButton
            ref="submit"
            action-key="save"
          />
        </div>
      </BaseCommunityUpdateFormContainer>
    </div>
  </BaseModalContainer>
</template>

<script>
import BaseModalContainer
  from '@/components/containers/modals/BaseModalContainer.vue'
import BaseCommunityUpdateFormContainer
  from '@/components/containers/forms/community/BaseCommunityUpdateFormContainer.vue'
import BaseImageField from '@/components/fields/BaseImageField.vue'
import BaseTitleField from '@/components/fields/BaseTitleField.vue'
import BaseDescriptionField from '@/components/fields/BaseDescriptionField.vue'
import BaseSubmitButton from '@/components/buttons/BaseSubmitButton.vue'

export default {
  name: 'BaseCommunityUpdateModal',
  components: {
    BaseModalContainer,
    BaseCommunityUpdateFormContainer,
    BaseImageField,
    BaseTitleField,
    BaseDescriptionField,
    BaseSubmitButton
  },
  props: {
    communityData: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      image: {}
    }
  },
  computed: {
    communityId () {
      return this.communityData.id.toString()
    },
    communityTitle () {
      return this.communityData.title
    },
    imageData () {
      return this.communityData.image
    },
    description () {
      return this.communityData.description
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

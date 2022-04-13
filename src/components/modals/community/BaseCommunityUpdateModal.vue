<template>
  <BaseModalContainer ref="modal">
    <div class="content">
      <BaseCommunityUpdateFormContainer
        class="main-community-form"
        :community-id="communityId"
        :image="image"
        @success="handleSuccess"
      >
        <div class="fields-container">
          <BaseImageField
            class="image-field"
            model="community"
            :value="imageData?.medium"
            @change="handleImageChange"
          />

          <div class="fields-right-column">
            <BaseTitleField
              ref="title"
              :value="communityTitle"
            />

            <BaseDescriptionField
              :value="description"
            />
          </div>
        </div>

        <div class="submit-button-container">
          <BaseSubmitButton
            action-key="save"
          />
        </div>
      </BaseCommunityUpdateFormContainer>
    </div>
  </BaseModalContainer>
</template>

<script>
import BaseModalContainer
  from '*/components/containers/modals/BaseModalContainer.vue'
import BaseCommunityUpdateFormContainer
  from '*/components/containers/forms/community/BaseCommunityUpdateFormContainer.vue'
import BaseImageField from '*/components/fields/BaseImageField.vue'
import BaseTitleField from '*/components/fields/BaseTitleField.vue'
import BaseDescriptionField from '*/components/fields/BaseDescriptionField.vue'
import BaseSubmitButton from '*/components/buttons/BaseSubmitButton.vue'

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

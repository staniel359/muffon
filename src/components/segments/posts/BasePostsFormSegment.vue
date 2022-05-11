<template>
  <BaseSegmentContainer>
    <BasePostCreateFormContainer
      class="main-post-form"
      :post-type="postType"
      :profile-id="profileId"
      :community-id="communityId"
      :images="images"
      :artists="artists"
      :albums="albums"
      :tracks="tracks"
      @success="handleSuccess"
    >
      <BaseContentField
        ref="content"
        @submit="handleSubmit"
      />

      <BaseSendableFormContentSection
        :images="images"
        :artists="artists"
        :albums="albums"
        :tracks="tracks"
      />

      <div class="buttons-container">
        <BaseFormAddButtonsSection
          :artists="artists"
          :albums="albums"
          :tracks="tracks"
        />

        <BasePostAsCommunityField
          v-if="isWithAsCommunityOption"
        />

        <BaseSubmitButton
          ref="submit"
          action-key="post"
        />
      </div>
    </BasePostCreateFormContainer>
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '*/components/containers/segments/BaseSegmentContainer.vue'
import BasePostCreateFormContainer
  from '*/components/containers/forms/post/BasePostCreateFormContainer.vue'
import BaseContentField from '*/components/fields/BaseContentField.vue'
import BaseSendableFormContentSection
  from '*/components/forms/sendable/BaseSendableFormContentSection.vue'
import BaseFormAddButtonsSection
  from '*/components/forms/BaseFormAddButtonsSection.vue'
import BasePostAsCommunityField
  from '*/components/fields/post/BasePostAsCommunityField.vue'
import BaseSubmitButton from '*/components/buttons/BaseSubmitButton.vue'
import sendableFormMixin from '*/mixins/sendableFormMixin'

export default {
  name: 'BasePostsFormSegment',
  components: {
    BaseSegmentContainer,
    BasePostCreateFormContainer,
    BaseContentField,
    BaseSendableFormContentSection,
    BaseFormAddButtonsSection,
    BasePostAsCommunityField,
    BaseSubmitButton
  },
  mixins: [
    sendableFormMixin
  ],
  props: {
    postType: String,
    profileId: String,
    communityId: String,
    isWithAsCommunityOption: Boolean
  },
  emits: [
    'success'
  ],
  methods: {
    handleSubmit () {
      this.clickSubmit()
    },
    handleSuccess () {
      this.$emit(
        'success'
      )
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

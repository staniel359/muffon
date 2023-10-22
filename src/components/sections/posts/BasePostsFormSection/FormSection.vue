<template>
  <BasePostCreateFormContainer
    class="main-sendable-form main-bottom-section"
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

    <div class="as-community-container">
      <BaseAsCommunityField
        v-if="isWithAsCommunityOption"
      />
    </div>

    <div class="buttons-container">
      <BaseFormAddButtonsSection
        :artists="artists"
        :albums="albums"
        :tracks="tracks"
      />

      <BaseSubmitButton
        ref="submit"
        action-key="post"
      />
    </div>
  </BasePostCreateFormContainer>
</template>

<script>
import BasePostCreateFormContainer
  from '@/components/containers/forms/post/BasePostCreateFormContainer.vue'
import BaseContentField from '@/components/fields/BaseContentField.vue'
import BaseSendableFormContentSection
  from '@/components/forms/sendable/BaseSendableFormContentSection.vue'
import BaseFormAddButtonsSection
  from '@/components/forms/BaseFormAddButtonsSection.vue'
import BaseAsCommunityField from '@/components/fields/BaseAsCommunityField.vue'
import BaseSubmitButton from '@/components/buttons/BaseSubmitButton.vue'
import sendableFormMixin from '@/mixins/sendableFormMixin'

export default {
  name: 'FormSection',
  components: {
    BasePostCreateFormContainer,
    BaseContentField,
    BaseSendableFormContentSection,
    BaseFormAddButtonsSection,
    BaseAsCommunityField,
    BaseSubmitButton
  },
  mixins: [
    sendableFormMixin
  ],
  props: {
    postType: String,
    profileId: String,
    communityId: String,
    isWithAsCommunityOption: Boolean,
    isShow: Boolean
  },
  emits: [
    'success'
  ],
  watch: {
    isShow: 'handleIsShowChange'
  },
  methods: {
    async handleIsShowChange (
      value
    ) {
      if (value) {
        await this.$nextTick()

        this.focusContent()
      }
    },
    handleSuccess (
      value
    ) {
      this.$emit(
        'success',
        value
      )
    },
    handleSubmit () {
      this.clickSubmit()
    },
    clickSubmit () {
      this.$refs
        .submit
        .click()
    },
    focusContent () {
      this.$refs
        .content
        .focus()
    }
  }
}
</script>

<style lang="sass" scoped></style>

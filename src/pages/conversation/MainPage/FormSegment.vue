<template>
  <BaseSegmentContainer>
    <BaseMessageCreateFormContainer
      class="main-sendable-form"
      :profile-id="profileId"
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

        <BaseSubmitButton
          ref="submit"
          action-key="send"
        />
      </div>
    </BaseMessageCreateFormContainer>
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import BaseMessageCreateFormContainer
  from '@/components/containers/forms/message/BaseMessageCreateFormContainer.vue'
import BaseContentField from '@/components/fields/BaseContentField.vue'
import BaseSendableFormContentSection
  from '@/components/forms/sendable/BaseSendableFormContentSection.vue'
import BaseFormAddButtonsSection
  from '@/components/forms/BaseFormAddButtonsSection.vue'
import BaseSubmitButton from '@/components/buttons/BaseSubmitButton.vue'
import sendableFormMixin from '@/mixins/sendableFormMixin'

export default {
  name: 'FormSegment',
  components: {
    BaseSegmentContainer,
    BaseMessageCreateFormContainer,
    BaseContentField,
    BaseSendableFormContentSection,
    BaseFormAddButtonsSection,
    BaseSubmitButton
  },
  mixins: [
    sendableFormMixin
  ],
  props: {
    profileId: Number
  },
  emits: [
    'success'
  ],
  mounted () {
    this.focusContent()
  },
  methods: {
    handleSuccess () {
      this.$emit(
        'success'
      )
    },
    handleSubmit () {
      this.clickSubmit()
    },
    focusContent () {
      this.$refs
        .content
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

<template>
  <BaseSegmentContainer>
    <BaseProfilePasswordResetFormContainer>
      <BaseProfileEmailField
        ref="email"
      />

      <div class="submit-button-container">
        <BaseProfileSubmitButton
          action-key="sendCode"
        />
      </div>
    </BaseProfilePasswordResetFormContainer>
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '*/components/containers/segments/BaseSegmentContainer.vue'
import BaseProfilePasswordResetFormContainer
  from '*/components/containers/forms/profile/BaseProfilePasswordResetFormContainer.vue'
import BaseProfileEmailField
  from '*/components/fields/profile/BaseProfileEmailField.vue'
import BaseProfileSubmitButton
  from '*/components/forms/profile/BaseProfileSubmitButton.vue'

export default {
  name: 'ResetFormSegment',
  components: {
    BaseSegmentContainer,
    BaseProfilePasswordResetFormContainer,
    BaseProfileEmailField,
    BaseProfileSubmitButton
  },
  mounted () {
    this.focusEmail()
  },
  methods: {
    focusEmail () {
      this.$refs
        .email
        .focus()
    }
  }
}
</script>

<style lang="sass" scoped></style>

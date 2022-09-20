<template>
  <BaseSegmentContainer>
    <BaseProfilePasswordResetFormContainer>
      <BaseProfileEmailField
        ref="email"
      />

      <div class="submit-button-container">
        <BaseSubmitButton
          action-key="sendCode"
          :is-with-icon="false"
        />
      </div>
    </BaseProfilePasswordResetFormContainer>
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import BaseProfilePasswordResetFormContainer
  from '@/components/containers/forms/profile/BaseProfilePasswordResetFormContainer.vue'
import BaseProfileEmailField
  from '@/components/fields/profile/BaseProfileEmailField.vue'
import BaseSubmitButton from '@/components/buttons/BaseSubmitButton.vue'

export default {
  name: 'ResetFormSegment',
  components: {
    BaseSegmentContainer,
    BaseProfilePasswordResetFormContainer,
    BaseProfileEmailField,
    BaseSubmitButton
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

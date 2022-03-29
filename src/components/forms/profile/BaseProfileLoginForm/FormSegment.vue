<template>
  <BaseSegmentContainer>
    <BaseProfileLoginFormContainer>
      <BaseProfileEmailField
        ref="email"
      />

      <BaseProfilePasswordField />

      <div class="remember-submit-button-container">
        <BaseProfileRememberField />

        <BaseProfileSubmitButton
          actionKey="login"
        />
      </div>
    </BaseProfileLoginFormContainer>
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '*/components/containers/segments/BaseSegmentContainer.vue'
import BaseProfileLoginFormContainer
  from '*/components/containers/forms/profile/BaseProfileLoginFormContainer.vue'
import BaseProfileEmailField
  from '*/components/fields/profile/BaseProfileEmailField.vue'
import BaseProfilePasswordField
  from '*/components/fields/profile/BaseProfilePasswordField.vue'
import BaseProfileRememberField
  from '*/components/fields/profile/BaseProfileRememberField.vue'
import BaseProfileSubmitButton
  from '*/components/forms/profile/BaseProfileSubmitButton.vue'

export default {
  name: 'FormSegment',
  components: {
    BaseSegmentContainer,
    BaseProfileLoginFormContainer,
    BaseProfileEmailField,
    BaseProfilePasswordField,
    BaseProfileRememberField,
    BaseProfileSubmitButton
  },
  mounted () {
    this.$refs.email.focus()
  }
}
</script>

<style lang="sass" scoped></style>

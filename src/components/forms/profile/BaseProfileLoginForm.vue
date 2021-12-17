<template>
  <BaseProfileLoginFormContainer>
    <BaseProfileEmailField
      ref="email"
    />

    <BaseProfilePasswordField />

    <BaseProfileRememberField />

    <div class="submit-button-container">
      <BaseProfileSubmitButton
        actionKey="login"
      />
    </div>

    <BaseDivider />

    <SignupSection
      @signupLinkClick="handleSignupLinkClick"
    />
  </BaseProfileLoginFormContainer>
</template>

<script>
import BaseProfileLoginFormContainer
  from '@/containers/forms/profile/BaseProfileLoginFormContainer.vue'
import BaseProfileEmailField
  from '@/fields/profile/BaseProfileEmailField.vue'
import BaseProfilePasswordField
  from '@/fields/profile/BaseProfilePasswordField.vue'
import BaseProfileRememberField
  from '@/fields/profile/BaseProfileRememberField.vue'
import BaseProfileSubmitButton
  from '@/forms/profile/BaseProfileSubmitButton.vue'
import BaseDivider from '@/BaseDivider.vue'
import SignupSection from './BaseProfileLoginForm/SignupSection.vue'

export default {
  name: 'BaseProfileLoginForm',
  components: {
    BaseProfileLoginFormContainer,
    BaseProfileEmailField,
    BaseProfilePasswordField,
    BaseProfileRememberField,
    BaseProfileSubmitButton,
    SignupSection,
    BaseDivider
  },
  emits: [
    'signupLinkClick'
  ],
  mounted () {
    this.$refs.email.focus()
  },
  methods: {
    handleSignupLinkClick () {
      this.$emit(
        'signupLinkClick'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>

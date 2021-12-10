<template>
  <BaseProfileLoginFormContainer>
    <BaseProfileEmailField />
    <BaseProfilePasswordField />

    <BaseProfileRememberField />

    <SubmitButton />

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
import SubmitButton from './BaseProfileLoginForm/SubmitButton.vue'
import BaseDivider from '@/BaseDivider.vue'
import SignupSection from './BaseProfileLoginForm/SignupSection.vue'

export default {
  name: 'BaseProfileLoginForm',
  components: {
    BaseProfileLoginFormContainer,
    BaseProfileEmailField,
    BaseProfilePasswordField,
    BaseProfileRememberField,
    SubmitButton,
    SignupSection,
    BaseDivider
  },
  emits: [
    'signupLinkClick'
  ],
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

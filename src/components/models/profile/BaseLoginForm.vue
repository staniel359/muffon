<template>
  <BaseProfileLoginContainer>
    <BaseProfileEmailField />
    <BaseProfilePasswordField />

    <BaseProfileRememberField />

    <SubmitButton />

    <BaseDivider />

    <SignupSection
      @signupLinkClick="handleSignupLinkClick"
    />
  </BaseProfileLoginContainer>
</template>

<script>
import BaseProfileLoginContainer
  from '@/containers/profile/BaseProfileLoginContainer.vue'
import BaseProfileEmailField
  from '@/models/profile/fields/BaseProfileEmailField.vue'
import BaseProfilePasswordField
  from '@/models/profile/fields/BaseProfilePasswordField.vue'
import BaseProfileRememberField
  from '@/models/profile/fields/BaseProfileRememberField.vue'
import SubmitButton from './BaseLoginForm/SubmitButton.vue'
import BaseDivider from '@/BaseDivider.vue'
import SignupSection from './BaseLoginForm/SignupSection.vue'

export default {
  name: 'BaseLoginForm',
  components: {
    BaseProfileLoginContainer,
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

<template>
  <BaseSegmentsContainer>
    <FormSegment />

    <GuestSegment />

    <PasswordResetSegment
      @password-reset-link-click="handlePasswordResetLinkClick"
    />

    <SignupSegment
      @signup-link-click="handleSignupLinkClick"
    />

    <SettingsSegment />
  </BaseSegmentsContainer>
</template>

<script>
import BaseSegmentsContainer
  from '@/components/containers/segments/BaseSegmentsContainer.vue'
import FormSegment from './BaseProfileLoginForm/FormSegment.vue'
import PasswordResetSegment
  from './BaseProfileLoginForm/PasswordResetSegment.vue'
import SignupSegment from './BaseProfileLoginForm/SignupSegment.vue'
import SettingsSegment from './BaseProfileLoginForm/SettingsSegment.vue'
import GuestSegment from './BaseProfileLoginForm/GuestSegment.vue'

export default {
  name: 'BaseProfileLoginForm',
  components: {
    BaseSegmentsContainer,
    FormSegment,
    PasswordResetSegment,
    SignupSegment,
    SettingsSegment,
    GuestSegment
  },
  emits: [
    'signupLinkClick',
    'passwordResetLinkClick'
  ],
  methods: {
    handlePasswordResetLinkClick () {
      this.$emit(
        'passwordResetLinkClick'
      )
    },
    handleSignupLinkClick () {
      this.$emit(
        'signupLinkClick'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>

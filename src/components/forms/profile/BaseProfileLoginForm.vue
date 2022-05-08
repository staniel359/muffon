<template>
  <FormSegment />

  <PasswordResetSegment
    @password-reset-link-click="handlePasswordResetLinkClick"
  />

  <SignupSegment
    @signup-link-click="handleSignupLinkClick"
  />
</template>

<script>
import FormSegment from './BaseProfileLoginForm/FormSegment.vue'
import PasswordResetSegment
  from './BaseProfileLoginForm/PasswordResetSegment.vue'
import SignupSegment from './BaseProfileLoginForm/SignupSegment.vue'

export default {
  name: 'BaseProfileLoginForm',
  components: {
    FormSegment,
    PasswordResetSegment,
    SignupSegment
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

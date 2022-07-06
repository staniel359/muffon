<template>
  <div
    :class="[
      'ui raised segments',
      'main-segment-container'
    ]"
  >
    <FormSegment />

    <PasswordResetSegment
      @password-reset-link-click="handlePasswordResetLinkClick"
    />

    <SignupSegment
      @signup-link-click="handleSignupLinkClick"
    />

    <SettingsSegment />
  </div>
</template>

<script>
import FormSegment from './BaseProfileLoginForm/FormSegment.vue'
import PasswordResetSegment
  from './BaseProfileLoginForm/PasswordResetSegment.vue'
import SignupSegment from './BaseProfileLoginForm/SignupSegment.vue'
import SettingsSegment from './BaseProfileLoginForm/SettingsSegment.vue'

export default {
  name: 'BaseProfileLoginForm',
  components: {
    FormSegment,
    PasswordResetSegment,
    SignupSegment,
    SettingsSegment
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

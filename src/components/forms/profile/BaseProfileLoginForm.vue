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

    <AnonymousSegment />

    <SettingsSegment />
  </div>
</template>

<script>
import FormSegment from './BaseProfileLoginForm/FormSegment.vue'
import PasswordResetSegment
  from './BaseProfileLoginForm/PasswordResetSegment.vue'
import SignupSegment from './BaseProfileLoginForm/SignupSegment.vue'
import SettingsSegment from './BaseProfileLoginForm/SettingsSegment.vue'
import AnonymousSegment from './BaseProfileLoginForm/AnonymousSegment.vue'

export default {
  name: 'BaseProfileLoginForm',
  components: {
    FormSegment,
    PasswordResetSegment,
    SignupSegment,
    SettingsSegment,
    AnonymousSegment
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

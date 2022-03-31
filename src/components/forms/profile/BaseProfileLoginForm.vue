<template>
  <FormSegment />

  <SignupSegment
    @signupLinkClick="handleSignupLinkClick"
  />
</template>

<script>
import FormSegment from './BaseProfileLoginForm/FormSegment.vue'
import SignupSegment from './BaseProfileLoginForm/SignupSegment.vue'

export default {
  name: 'BaseProfileLoginForm',
  components: {
    FormSegment,
    SignupSegment
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

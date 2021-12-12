<template>
  <div class="signup-section">
    {{ signupText }}

    <span
      class="main-link"
      @click="handleSignupLinkClick"
    >
      <strong>
        {{ linkText }}
      </strong>
    </span>
  </div>
</template>

<script>
export default {
  name: 'SignupSection',
  emits: [
    'signupLinkClick'
  ],
  computed: {
    signupText () {
      return this.$t(
        'shared.profile.form.signup.text'
      )
    },
    linkText () {
      return this.$t(
        'shared.profile.form.signup.link'
      )
    }
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

<style lang="sass" scoped>
.signup-section
  @extend .text-align-center
</style>

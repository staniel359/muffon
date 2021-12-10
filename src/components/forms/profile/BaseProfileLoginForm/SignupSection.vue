<template>
  <div class="signup-section">
    {{ textFormatted }}

    <span
      class="main-link"
      @click="handleSignupLinkClick"
    >
      <strong>
        {{ linkFormatted }}
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
    textFormatted () {
      return this.$t(
        'shared.profile.form.signup.text'
      )
    },
    linkFormatted () {
      return this.$t(
        'shared.profile.form.signup.link'
      )
    }
  },
  methods: {
    handleSignupLinkClick () {
      this.$emit('signupLinkClick')
    }
  }
}
</script>

<style lang="sass" scoped>
.signup-section
  @extend .text-align-center
</style>

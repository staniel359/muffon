<template>
  <div class="auth-form-container">
    <BaseHeader
      class="main-app-title"
      tag="h1"
      text="muffon"
    />

    <BaseProfileLoginForm
      v-if="isLogin"
      class="auth-form-segment"
      @signupLinkClick="handleSignupLinkClick"
    />
    <BaseProfileSignupForm
      v-else-if="isSignup"
      class="auth-form-segment"
      @loginLinkClick="handleLoginLinkClick"
    />
  </div>
</template>

<script>
import BaseHeader from '@/BaseHeader.vue'
import BaseProfileLoginForm from '@/forms/profile/BaseProfileLoginForm.vue'
import BaseProfileSignupForm from '@/forms/profile/BaseProfileSignupForm.vue'

export default {
  name: 'TheAuthentication',
  components: {
    BaseHeader,
    BaseProfileLoginForm,
    BaseProfileSignupForm
  },
  data () {
    return {
      activeForm: 'login'
    }
  },
  computed: {
    isLogin () {
      return (
        this.activeForm ===
          'login'
      )
    },
    isSignup () {
      return (
        this.activeForm ===
          'signup'
      )
    }
  },
  methods: {
    handleSignupLinkClick () {
      this.activeForm = 'signup'
    },
    handleLoginLinkClick () {
      this.activeForm = 'login'
    }
  }
}
</script>

<style lang="sass" scoped>
.auth-form-container
  @extend .d-flex, .flex-column, .align-items-center
  margin-top: 5vh

.auth-form-segment
  width: 400px
</style>

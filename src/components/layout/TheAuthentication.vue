<template>
  <div class="the-authentication">
    <BaseLogoTitleSection />

    <div class="form-segment-container">
      <BaseProfileLoginForm
        v-if="isLogin"
        @signup-link-click="handleSignupLinkClick"
        @password-reset-link-click="handlePasswordResetLinkClick"
      />
      <BaseProfilePasswordResetForm
        v-else-if="isPasswordReset"
        @back-link-click="handleBackLinkClick"
      />
      <BaseProfileCreateForm
        v-else-if="isSignup"
        @login-link-click="handleLoginLinkClick"
      />
    </div>
  </div>
</template>

<script>
import BaseLogoTitleSection from '@/components/BaseLogoTitleSection.vue'
import BaseProfileLoginForm
  from '@/components/forms/profile/BaseProfileLoginForm.vue'
import BaseProfilePasswordResetForm
  from '@/components/forms/profile/BaseProfilePasswordResetForm.vue'
import BaseProfileCreateForm
  from '@/components/forms/profile/BaseProfileCreateForm.vue'

export default {
  name: 'TheAuthentication',
  components: {
    BaseLogoTitleSection,
    BaseProfileLoginForm,
    BaseProfilePasswordResetForm,
    BaseProfileCreateForm
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
    isPasswordReset () {
      return (
        this.activeForm ===
          'passwordReset'
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
    handlePasswordResetLinkClick () {
      this.activeForm = 'passwordReset'
    },
    handleLoginLinkClick () {
      this.activeForm = 'login'
    },
    handleBackLinkClick () {
      this.activeForm = 'login'
    }
  }
}
</script>

<style lang="sass" scoped>
.the-authentication
  @extend .d-flex, .flex-column, .align-items-center
  margin-top: 5vh

.form-segment-container
  width: 400px
  margin-top: 1.5em
</style>

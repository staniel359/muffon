<template>
  <div class="the-authentication">
    <div class="main-transition-item">
      <BaseLogoSection />
    </div>

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
import BaseLogoSection from '@/components/sections/BaseLogoSection.vue'
import BaseProfileLoginForm
  from '@/components/forms/profile/BaseProfileLoginForm.vue'
import BaseProfilePasswordResetForm
  from '@/components/forms/profile/BaseProfilePasswordResetForm.vue'
import BaseProfileCreateForm
  from '@/components/forms/profile/BaseProfileCreateForm.vue'
import {
  set as setTransition
} from '@/helpers/actions/plugins/semantic/transition'
import {
  main as formatMainTransitionOptions
} from '@/helpers/formatters/plugins/semantic/options/transition'

export default {
  name: 'TheAuthentication',
  components: {
    BaseLogoSection,
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
    },
    transitionOptions () {
      return formatMainTransitionOptions()
    }
  },
  mounted () {
    setTransition(
      '.main-transition-item',
      this.transitionOptions
    )
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

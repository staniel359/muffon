<template>
  <div class="auth-form-container">
    <BaseHeader
      class="main-app-title"
      tag="h1"
      text="muffon"
    />

    <BaseSegmentContainer class="auth-form-segment">
      <LoginForm
        v-if="activeForm === 'login'"
        @signupLinkClick="handleSignupLinkClick"
      />

      <SignupForm
        v-else-if="activeForm === 'signup'"
        @loginLinkClick="handleLoginLinkClick"
      />
    </BaseSegmentContainer>
  </div>
</template>

<script>
import BaseHeader from '@/BaseHeader.vue'
import BaseSegmentContainer from '@/containers/BaseSegmentContainer.vue'
import LoginForm from './TheAuthentication/LoginForm.vue'
import SignupForm from './TheAuthentication/SignupForm.vue'

export default {
  name: 'TheAuthentication',
  components: {
    BaseHeader,
    BaseSegmentContainer,
    LoginForm,
    SignupForm
  },
  data () {
    return {
      activeForm: 'login'
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
  @extend .d-flex, .flex-column, .align-items-center, .justify-content-center
  margin-top: 10vh

.auth-form-segment
  width: 400px
</style>

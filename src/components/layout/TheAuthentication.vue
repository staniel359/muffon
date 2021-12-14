<template>
  <div class="auth-form-container">
    <BaseHeader
      class="main-app-title"
      tag="h1"
      text="muffon"
    />

    <BaseSegmentContainer
      :class="[
        'raised',
        'auth-form-segment',
        'main-segment-container'
      ]"
    >
      <BaseProfileLoginForm
        v-if="activeForm === 'login'"
        @signupLinkClick="handleSignupLinkClick"
      />

      <BaseProfileSignupForm
        v-else-if="activeForm === 'signup'"
        @loginLinkClick="handleLoginLinkClick"
      />
    </BaseSegmentContainer>
  </div>
</template>

<script>
import BaseHeader from '@/BaseHeader.vue'
import BaseSegmentContainer
  from '@/containers/segments/BaseSegmentContainer.vue'
import BaseProfileLoginForm from '@/forms/profile/BaseProfileLoginForm.vue'
import BaseProfileSignupForm from '@/forms/profile/BaseProfileSignupForm.vue'

export default {
  name: 'TheAuthentication',
  components: {
    BaseHeader,
    BaseSegmentContainer,
    BaseProfileLoginForm,
    BaseProfileSignupForm
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
  @extend .d-flex, .flex-column, .align-items-center
  margin-top: 5vh

.auth-form-segment
  width: 400px
</style>

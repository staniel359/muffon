<template>
  <div class="form-container">
    <BaseHeader
      class="main-app-title"
      tag="h1"
      text="muffon"
    />

    <div
      :class="[
        'ui raised segments',
        'main-segment-container',
        'form-segment-container'
      ]"
    >
      <BaseProfileLoginForm
        v-if="isLogin"
        @signupLinkClick="handleSignupLinkClick"
      />
      <BaseProfileSignupForm
        v-else-if="isSignup"
        @loginLinkClick="handleLoginLinkClick"
      />

      <BaseSegmentContainer
        class="form-language-container"
      >
        <BaseLanguageDropdown />
      </BaseSegmentContainer>
    </div>
  </div>
</template>

<script>
import BaseHeader from '*/components/BaseHeader.vue'
import BaseProfileLoginForm
  from '*/components/forms/profile/BaseProfileLoginForm.vue'
import BaseProfileSignupForm
  from '*/components/forms/profile/BaseProfileSignupForm.vue'
import BaseSegmentContainer
  from '*/components/containers/segments/BaseSegmentContainer.vue'
import BaseLanguageDropdown from '*/components/BaseLanguageDropdown.vue'

export default {
  name: 'TheAuthentication',
  components: {
    BaseHeader,
    BaseProfileLoginForm,
    BaseProfileSignupForm,
    BaseSegmentContainer,
    BaseLanguageDropdown
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
.form-container
  @extend .d-flex, .flex-column, .align-items-center
  margin-top: 5vh

.form-segment-container
  width: 400px

.form-language-container
  @extend .d-flex, .justify-content-center
</style>

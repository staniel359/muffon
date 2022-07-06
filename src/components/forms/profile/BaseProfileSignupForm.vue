<template>
  <div
    :class="[
      'ui raised segments',
      'main-segment-container'
    ]"
  >
    <FormSegment />

    <LoginSegment
      @login-link-click="handleLoginLinkClick"
    />
  </div>
</template>

<script>
import FormSegment from './BaseProfileSignupForm/FormSegment.vue'
import LoginSegment from './BaseProfileSignupForm/LoginSegment.vue'

export default {
  name: 'BaseProfileSignupForm',
  components: {
    FormSegment,
    LoginSegment
  },
  emits: [
    'loginLinkClick'
  ],
  methods: {
    handleLoginLinkClick () {
      this.$emit(
        'loginLinkClick'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>

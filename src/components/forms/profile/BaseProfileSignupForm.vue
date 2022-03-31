<template>
  <FormSegment />

  <LoginSegment
    @loginLinkClick="handleLoginLinkClick"
  />
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

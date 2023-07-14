<template>
  <div
    :class="[
      'ui raised segments main-segments',
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
import FormSegment from './BaseProfileCreateForm/FormSegment.vue'
import LoginSegment from './BaseProfileCreateForm/LoginSegment.vue'

export default {
  name: 'BaseProfileCreateForm',
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

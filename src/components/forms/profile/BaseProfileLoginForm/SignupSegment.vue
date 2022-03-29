<template>
  <BaseSegmentContainer
    class="signup-segment"
  >
    {{ signupText }}

    <span
      class="main-link"
      @click="handleSignupLinkClick"
    >
      <strong>
        {{ linkText }}
      </strong>
    </span>
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '*/components/containers/segments/BaseSegmentContainer.vue'

export default {
  name: 'SignupSegment',
  components: {
    BaseSegmentContainer
  },
  emits: [
    'signupLinkClick'
  ],
  computed: {
    signupText () {
      return this.$t(
        'signup.text'
      )
    },
    linkText () {
      return this.$t(
        'signup.link'
      )
    }
  },
  methods: {
    handleSignupLinkClick () {
      this.$emit(
        'signupLinkClick'
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.signup-segment
  @extend .text-align-center
</style>

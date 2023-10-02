<template>
  <BaseSegmentContainer
    class="text-align-center"
  >
    {{ signupText }}

    <span
      class="main-link"
      @click="handleSignupLinkClick"
    >
      <strong
        v-text="linkText"
      />
    </span>
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'

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

<style lang="sass" scoped></style>

<template>
  <BaseSegmentContainer
    class="text-align-center"
  >
    {{ passwordResetText }}

    <span
      class="main-link"
      @click="handlePasswordResetLinkClick"
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
  name: 'PasswordResetSegment',
  components: {
    BaseSegmentContainer
  },
  emits: [
    'passwordResetLinkClick'
  ],
  computed: {
    passwordResetText () {
      return this.$t(
        'passwordReset.text'
      )
    },
    linkText () {
      return this.$t(
        'passwordReset.link'
      )
    }
  },
  methods: {
    handlePasswordResetLinkClick () {
      this.$emit(
        'passwordResetLinkClick'
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>

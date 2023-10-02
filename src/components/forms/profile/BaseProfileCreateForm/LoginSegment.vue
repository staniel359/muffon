<template>
  <BaseSegmentContainer
    class="text-align-center"
  >
    {{ loginText }}

    <span
      class="main-link"
      @click="handleLoginLinkClick"
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
  name: 'LoginSegment',
  components: {
    BaseSegmentContainer
  },
  emits: [
    'loginLinkClick'
  ],
  computed: {
    loginText () {
      return this.$t(
        'login.text'
      )
    },
    linkText () {
      return this.$t(
        'login.link'
      )
    }
  },
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

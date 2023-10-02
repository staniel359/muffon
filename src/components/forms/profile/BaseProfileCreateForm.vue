<template>
  <BaseSegmentsContainer>
    <FormSegment />

    <LoginSegment
      @login-link-click="handleLoginLinkClick"
    />
  </BaseSegmentsContainer>
</template>

<script>
import BaseSegmentsContainer
  from '@/components/containers/segments/BaseSegmentsContainer.vue'
import FormSegment from './BaseProfileCreateForm/FormSegment.vue'
import LoginSegment from './BaseProfileCreateForm/LoginSegment.vue'

export default {
  name: 'BaseProfileCreateForm',
  components: {
    BaseSegmentsContainer,
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

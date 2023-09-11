<template>
  <BaseModalContainer
    ref="modal"
    class="base-image-modal"
    is-render
    @show="handleShow"
  >
    <slot />
  </BaseModalContainer>
</template>

<script>
import BaseModalContainer
  from '@/components/containers/modals/BaseModalContainer.vue'

export default {
  name: 'BaseImageModalContainer',
  components: {
    BaseModalContainer
  },
  emits: [
    'show'
  ],
  methods: {
    handleShow () {
      this.$emit(
        'show'
      )
    },
    show () {
      this.$refs
        .modal
        .show()
    }
  }
}
</script>

<style lang="sass" scoped>
.base-image-modal
  @extend .no-margin, .no-shadow, .no-border, .no-border-radius, .width-fit-content, .background-transparent
  &.scrolling
    top: unset !important
    &:after
      @extend .d-none
</style>

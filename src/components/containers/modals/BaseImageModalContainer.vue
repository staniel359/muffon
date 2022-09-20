<template>
  <BaseModalContainer
    ref="modal"
    class="main-image-modal"
    is-image-modal
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

<style lang="sass" scoped></style>

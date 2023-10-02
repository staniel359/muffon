<template>
  <BaseModalContainer
    ref="modal"
    class="base-image-modal no-margin no-shadow no-border no-border-radius background-transparent"
    :size="size"
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
  props: {
    size: String
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
@import '@/assets/styles/Shared.sass'

.base-image-modal
  &:not(.main-artist-images-modal)
    @extend .width-fit-content
</style>

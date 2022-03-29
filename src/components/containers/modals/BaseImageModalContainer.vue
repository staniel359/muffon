<template>
  <BaseModalContainer
    class="main-image-modal"
    @init="handleInit"
    @show="handleShow"
  >
    <slot></slot>
  </BaseModalContainer>
</template>

<script>
import BaseModalContainer
  from '*/components/containers/modals/BaseModalContainer.vue'

export default {
  name: 'BaseImageModalContainer',
  components: {
    BaseModalContainer
  },
  emits: [
    'init',
    'show'
  ],
  methods: {
    handleInit (el) {
      this.$emit('init', el)
    },
    handleShow () {
      this.$emit('show')
    }
  }
}
</script>

<style lang="sass" scoped></style>

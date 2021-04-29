<template>
  <BaseModalContainer
    class="main-image-modal"
    @init="handleInit"
  >
    <slot></slot>
  </BaseModalContainer>
</template>

<script>
import BaseModalContainer from '@/containers/BaseModalContainer.vue'

export default {
  name: 'BaseImageModalContainer',
  components: {
    BaseModalContainer
  },
  emits: [
    'init'
  ],
  methods: {
    handleInit (el) {
      this.$emit('init', el)
    }
  }
}
</script>

<style lang="sass" scoped></style>

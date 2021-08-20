<template>
  <BaseModalContainer class="main-image-modal">
    <slot></slot>
  </BaseModalContainer>
</template>

<script>
import BaseModalContainer from '@/containers/BaseModalContainer.vue'

export default {
  name: 'BaseImageModalContainer',
  components: {
    BaseModalContainer
  }
}
</script>

<style lang="sass" scoped></style>

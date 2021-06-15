<template>
  <BaseSegmentContainer
    :class="[
      'main-segment-container',
      'main-page-segment-container'
    ]"
    :isLoading="isLoading"
    :error="error"
    @refresh="handleRefresh"
  >
    <slot></slot>
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer from '@/containers/BaseSegmentContainer.vue'

export default {
  name: 'BaseAlbumPageSegmentContainer',
  components: {
    BaseSegmentContainer
  },
  props: {
    isLoading: Boolean,
    error: Error
  },
  emits: [
    'refresh'
  ],
  methods: {
    handleRefresh () {
      this.$emit('refresh')
    }
  }
}
</script>

<style lang="sass" scoped></style>

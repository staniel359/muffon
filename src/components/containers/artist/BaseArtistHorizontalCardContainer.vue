<template>
  <BaseHorizontalCardContainer>
    <BaseSegmentContainer
      class="basic segment-container"
      :is-loading="isLoading"
      :error="error"
      @refresh="handleRefresh"
    >
      <slot />
    </BaseSegmentContainer>
  </BaseHorizontalCardContainer>
</template>

<script>
import BaseHorizontalCardContainer
  from '*/components/containers/cards/BaseHorizontalCardContainer.vue'
import BaseSegmentContainer
  from '*/components/containers/segments/BaseSegmentContainer.vue'

export default {
  name: 'BaseArtistHorizontalCardContainer',
  components: {
    BaseHorizontalCardContainer,
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
      this.$emit(
        'refresh'
      )
    }
  }
}
</script>

<style lang="sass" scoped>
.segment-container
  @extend .d-flex, .no-padding
</style>

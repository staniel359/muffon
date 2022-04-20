<template>
  <BaseModalContainer
    ref="modal"
    @show.once="handleCall"
  >
    <BaseSegmentContainer
      ref="segment"
      class="basic scrolling content"
      :is-loading="isLoading"
      :error="error"
      @refresh="handleRefresh"
    >
      <slot
        v-if="responseData"
      />
    </BaseSegmentContainer>
  </BaseModalContainer>
</template>

<script>
import BaseModalContainer
  from '*/components/containers/modals/BaseModalContainer.vue'
import BaseSegmentContainer
  from '*/components/containers/segments/BaseSegmentContainer.vue'

export default {
  name: 'BaseSegmentModalContainer',
  components: {
    BaseModalContainer,
    BaseSegmentContainer
  },
  props: {
    isLoading: Boolean,
    error: Error,
    responseData: Object
  },
  emits: [
    'call',
    'refresh'
  ],
  methods: {
    handleCall () {
      this.$emit(
        'call'
      )
    },
    handleRefresh () {
      this.$emit(
        'refresh'
      )
    },
    show () {
      this.$refs
        .modal
        .show()
    },
    hide () {
      this.$refs
        .modal
        .hide()
    },
    scrollToTop () {
      this.$refs
        .segment
        .scrollToTop()
    }
  }
}
</script>

<style lang="sass" scoped></style>

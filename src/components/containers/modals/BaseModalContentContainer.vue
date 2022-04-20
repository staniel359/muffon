<template>
  <BaseModalContainer
    ref="modal"
    @show.once="handleCall"
  >
    <BaseSegmentContainer
      ref="segment"
      :class="[
        'basic scrolling content',
        'main-scrolling-segment',
        {
          'main-modal-content-full-height':
            responseData
        }
      ]"
      :is-loading="isLoading"
      :error="errorConditional"
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
  name: 'BaseModalContentContainer',
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
  computed: {
    errorConditional () {
      if (this.isError) {
        return this.error
      } else {
        return null
      }
    },
    isError () {
      return !!(
        !this.responseData &&
          this.error
      )
    }
  },
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

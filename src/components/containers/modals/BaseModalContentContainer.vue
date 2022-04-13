<template>
  <BaseModalContainer
    ref="modal"
    @show.once="handleCall"
  >
    <BaseSegmentContainer
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
    }
  }
}
</script>

<style lang="sass" scoped></style>

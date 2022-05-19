<template>
  <BaseModalContainer
    ref="modal"
    @show.once="handleCall"
  >
    <BasePaginatedSegmentContainer
      ref="segment"
      :class="[
        'basic scrolling content',
        {
          'main-modal-content-full-height':
            responseData
        }
      ]"
      :response-data="responseData"
      :is-loading="isLoading"
      :error="error"
      :scope="scope"
      :limit="limit"
      @focus="handleFocus"
    >
      <template #default="slotProps">
        <slot
          :[scope]="slotProps[scope]"
        />
      </template>
    </BasePaginatedSegmentContainer>
  </BaseModalContainer>
</template>

<script>
import BaseModalContainer
  from '*/components/containers/modals/BaseModalContainer.vue'
import BasePaginatedSegmentContainer
  from '*/components/containers/segments/BasePaginatedSegmentContainer.vue'

export default {
  name: 'BasePaginatedSegmentModalContainer',
  components: {
    BaseModalContainer,
    BasePaginatedSegmentContainer
  },
  props: {
    responseData: Object,
    isLoading: Boolean,
    error: Error,
    scope: String,
    limit: Number
  },
  emits: [
    'call'
  ],
  methods: {
    handleCall () {
      this.$emit(
        'call'
      )
    },
    handleFocus () {
      this.scrollToTop()
    },
    scrollToTop () {
      this.$refs
        .segment
        .scrollToTop()
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

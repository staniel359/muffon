<template>
  <BaseSegmentContainer
    ref="segment"
    class="main-paginated-segment-container"
    :response-data="responseData"
    :is-loading="isLoading"
    :error="error"
    @refresh="handleRefresh"
  >
    <BasePaginatedListContainer
      ref="pagination"
      :response-data="responseData"
      :scope="scope"
      :limit="limit"
      :client-page-limit="clientPageLimit"
      :response-page-limit="responsePageLimit"
      :is-loading="isLoading"
      :error="error"
      :is-pagination-simple="isPaginationSimple"
      :is-reset="isReset"
      @focus="handleFocus"
    >
      <template #default="slotProps">
        <slot
          :[scope]="slotProps[scope]"
        />
      </template>
    </BasePaginatedListContainer>
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '*/components/containers/segments/BaseSegmentContainer.vue'
import BasePaginatedListContainer
  from '*/components/containers/lists/BasePaginatedListContainer.vue'

export default {
  name: 'BasePaginatedSegmentContainer',
  components: {
    BaseSegmentContainer,
    BasePaginatedListContainer
  },
  inject: [
    'getData'
  ],
  props: {
    slotPropsData: {
      type: Object,
      required: true
    },
    responseDataName: {
      type: String,
      required: true
    },
    scope: {
      type: String,
      required: true
    },
    limit: Number,
    clientPageLimit: Number,
    responsePageLimit: Number,
    isPaginationSimple: Boolean,
    isReset: Boolean
  },
  emits: [
    'focus'
  ],
  computed: {
    isLoading () {
      return this.slotPropsData.isLoading
    },
    error () {
      return this.slotPropsData.error
    },
    responseData () {
      return this.slotPropsData[
        this.responseDataName
      ]
    }
  },
  methods: {
    handleRefresh () {
      this.getData()
    },
    handleFocus () {
      this.$emit(
        'focus'
      )
    },
    reset () {
      this.$refs
        .pagination
        .reset()
    },
    focus () {
      this.$refs
        .segment
        .focus()
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

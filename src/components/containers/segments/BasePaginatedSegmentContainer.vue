<template>
  <BaseSegmentContainer
    ref="segment"
    class="main-paginated-segment-container"
    :response-data="responseData"
    :is-loading="isSegmentLoading"
    :error="error"
    :is-change-transparency="isChangeTransparency"
    @refresh="handleRefresh"
  >
    <slot
      name="top"
    />

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
      :is-with-infinite-scroll="isWithInfiniteScroll"
      @focus="handleFocus"
    >
      <template
        #default="slotProps"
      >
        <slot
          :[scope]="slotProps[scope]"
        />
      </template>
    </BasePaginatedListContainer>
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import BasePaginatedListContainer
  from '@/components/containers/lists/BasePaginatedListContainer.vue'

export default {
  name: 'BasePaginatedSegmentContainer',
  components: {
    BaseSegmentContainer,
    BasePaginatedListContainer
  },
  inject: {
    getData: {
      default: () => false
    }
  },
  props: {
    scope: {
      type: String,
      required: true
    },
    isChangeTransparency: {
      type: Boolean,
      default: true
    },
    responseData: Object,
    isLoading: Boolean,
    error: Error,
    limit: Number,
    clientPageLimit: Number,
    responsePageLimit: Number,
    isPaginationSimple: Boolean,
    isWithInfiniteScroll: Boolean
  },
  emits: [
    'focus'
  ],
  computed: {
    isSegmentLoading () {
      if (this.isWithInfiniteScroll) {
        return (
          !this.responseData &&
            this.isLoading
        )
      } else {
        return this.isLoading
      }
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

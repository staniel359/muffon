<template>
  <BaseSegmentContainer
    ref="segment"
    class="main-paginated-segment-container"
    :response-data="responseDataComputed"
    :is-loading="isSegmentLoading"
    :error="error"
    @refresh="handleRefresh"
  >
    <slot
      name="top"
    />

    <Component
      :is="listComponent"
      ref="pagination"
      :key="refreshKey"
      :response-data="responseDataComputed"
      :scope="scope"
      :text-scope="textScope"
      :limit="limit"
      :response-page-limit="responsePageLimit"
      :is-loading="isLoading"
      :error="error"
      :scroll-context="scrollContext"
      @focus="handleFocus"
    >
      <template
        #default="slotProps"
      >
        <slot
          :[scope]="slotProps[scope]"
        />
      </template>
    </Component>
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import BasePaginatedInfiniteSimpleListContainer
  from '@/components/containers/lists/paginated/BasePaginatedInfiniteSimpleListContainer.vue'
import BasePaginatedInfiniteListContainer
  from '@/components/containers/lists/paginated/BasePaginatedInfiniteListContainer.vue'
import BasePaginatedSimpleListContainer
  from '@/components/containers/lists/paginated/BasePaginatedSimpleListContainer.vue'
import BasePaginatedListContainer
  from '@/components/containers/lists/paginated/BasePaginatedListContainer.vue'
import refreshableMixin from '@/mixins/refreshableMixin'

export default {
  name: 'BasePaginatedSegmentContainer',
  components: {
    BaseSegmentContainer,
    BasePaginatedInfiniteSimpleListContainer,
    BasePaginatedInfiniteListContainer,
    BasePaginatedSimpleListContainer,
    BasePaginatedListContainer
  },
  mixins: [
    refreshableMixin
  ],
  props: {
    scope: {
      type: String,
      required: true
    },
    textScope: String,
    responseData: Object,
    isLoading: Boolean,
    error: Error,
    limit: Number,
    responsePageLimit: Number,
    isPaginationSimple: Boolean,
    isWithInfiniteScroll: Boolean,
    scrollContext: HTMLDivElement
  },
  emits: [
    'focus'
  ],
  computed: {
    listComponent () {
      if (this.isWithInfiniteScroll) {
        if (this.isPaginationSimple) {
          return 'BasePaginatedInfiniteSimpleListContainer'
        } else {
          return 'BasePaginatedInfiniteListContainer'
        }
      } else {
        if (this.isPaginationSimple) {
          return 'BasePaginatedSimpleListContainer'
        } else {
          return 'BasePaginatedListContainer'
        }
      }
    },
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
  watch: {
    isWithInfiniteScroll:
      'handleIsWithInfiniteScrollChange'
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
    handleIsWithInfiniteScrollChange () {
      this.refresh()
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
    },
    setFocusable () {
      this.$refs
        .pagination
        .setFocusable()
    }
  }
}
</script>

<style lang="sass" scoped></style>

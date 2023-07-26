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
      :key="key"
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
import {
  generateKey
} from '@/helpers/utils'

export default {
  name: 'BasePaginatedSegmentContainer',
  components: {
    BaseSegmentContainer,
    BasePaginatedInfiniteSimpleListContainer,
    BasePaginatedInfiniteListContainer,
    BasePaginatedSimpleListContainer,
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
  data () {
    return {
      key: null,
      responseDataComputed: null
    }
  },
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
    responseData: {
      immediate: true,
      handler: 'handleResponseDataChange'
    },
    isWithInfiniteScroll:
      'handleIsWithInfiniteScrollChange'
  },
  methods: {
    handleResponseDataChange (
      value
    ) {
      this.responseDataComputed = value
    },
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
    refresh () {
      this.reset()

      this.getData()
    },
    reset () {
      this.responseDataComputed = null

      this.key = generateKey()
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

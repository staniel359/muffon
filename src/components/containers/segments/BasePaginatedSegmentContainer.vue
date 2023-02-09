<template>
  <BaseSegmentContainer
    ref="segment"
    class="main-paginated-segment-container"
    :response-data="responseDataComputed"
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
      :key="key"
      :response-data="responseDataComputed"
      :scope="scope"
      :text-scope="textScope"
      :limit="limit"
      :client-page-limit="clientPageLimit"
      :response-page-limit="responsePageLimit"
      :is-loading="isLoading"
      :error="error"
      :is-pagination-simple="isPaginationSimple"
      :is-with-infinite-scroll="isWithInfiniteScroll"
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
    </BasePaginatedListContainer>
  </BaseSegmentContainer>
</template>

<script>
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import BasePaginatedListContainer
  from '@/components/containers/lists/BasePaginatedListContainer.vue'
import {
  generateKey
} from '#/helpers/utils'

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
    textScope: String,
    responseData: Object,
    isLoading: Boolean,
    error: Error,
    limit: Number,
    clientPageLimit: Number,
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

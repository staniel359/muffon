<template>
  <div
    :class="[
      'ui raised segments',
      'main-segment-container',
      'main-page-segment-container'
    ]"
  >
    <BaseSegmentContainer
      v-if="isWithTopSegment"
      class="top-segment"
    >
      <slot
        name="top"
      />

      <BaseViewChangeDropdown
        v-if="isWithViewChange"
        :scope="scope"
        :view-id="viewId"
        @select="handleViewSelect"
      />
    </BaseSegmentContainer>

    <BasePaginatedSegmentContainer
      ref="pagination"
      class="main-paginated-page-segment-container"
      :response-data="responseDataComputed"
      :is-loading="isLoading"
      :error="error"
      :scope="scope"
      :limit="limit"
      :client-page-limit="clientPageLimit"
      :response-page-limit="responsePageLimit"
      :is-pagination-simple="isPaginationSimple"
      :is-with-infinite-scroll="isWithInfiniteScroll"
      @focus="handleFocus"
    >
      <template #default="slotProps">
        <slot
          :[scope]="slotProps[scope]"
        />
      </template>
    </BasePaginatedSegmentContainer>
  </div>
</template>

<script>
import {
  mapState
} from 'vuex'
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import BaseViewChangeDropdown
  from '@/components/dropdowns/BaseViewChangeDropdown.vue'
import BasePaginatedSegmentContainer
  from '@/components/containers/segments/BasePaginatedSegmentContainer.vue'

export default {
  name: 'BasePaginatedPageContainer',
  components: {
    BaseSegmentContainer,
    BaseViewChangeDropdown,
    BasePaginatedSegmentContainer
  },
  inject: {
    setViewId: {
      default: () => false
    },
    getData: {
      default: () => false
    }
  },
  props: {
    scope: {
      type: String,
      required: true
    },
    responseData: Object,
    isLoading: Boolean,
    error: Error,
    limit: Number,
    clientPageLimit: Number,
    responsePageLimit: Number,
    isPaginationSimple: Boolean,
    isWithTopSegment: Boolean,
    isWithViewChange: Boolean,
    viewId: String
  },
  data () {
    return {
      responseDataComputed: null
    }
  },
  computed: {
    ...mapState(
      'layout',
      [
        'isWithInfiniteScroll'
      ]
    )
  },
  watch: {
    responseData: {
      immediate: true,
      handler: 'handleResponseDataChange'
    },
    viewId: 'handleViewIdChange',
    isWithInfiniteScroll:
      'handleIsWithInfiniteScrollChange'
  },
  methods: {
    handleResponseDataChange (
      value
    ) {
      this.responseDataComputed = value
    },
    handleViewSelect (
      value
    ) {
      this.setViewId(
        value
      )
    },
    handleViewIdChange () {
      this.refresh()
    },
    handleIsWithInfiniteScrollChange () {
      this.refresh()
    },
    handleFocus () {
      this.focus()
    },
    async refresh () {
      this.responseDataComputed = null

      this.reset()

      await this.$nextTick()

      this.getData()
    },
    focus () {
      this.$refs
        .pagination
        .focus()
    },
    reset () {
      this.$refs
        .pagination
        .reset()
    }
  }
}
</script>

<style lang="sass" scoped>
.top-segment
  @extend .d-flex, .align-items-center, .justify-content-space-between
  ::v-deep(.main-accordion)
    @extend .flex-full
</style>

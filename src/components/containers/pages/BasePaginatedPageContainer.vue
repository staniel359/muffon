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
    >
      <div class="top-section">
        <div class="top-left-section">
          <slot
            name="top"
          />
        </div>

        <div class="top-right-section">
          <BaseOrderSelect
            v-if="isWithOrderChange"
            class="select-block"
            :order="order"
            :model="model"
            @select="handleOrderSelect"
          />

          <BaseViewSelect
            v-if="isWithViewChange"
            :key="viewSelectKey"
            class="select-block"
            :scope="scope"
            :view-id="viewId"
          />
        </div>
      </div>

      <div>
        <slot
          name="topExtra"
        />
      </div>
    </BaseSegmentContainer>

    <BasePaginatedSegmentContainer
      ref="pagination"
      :key="paginationKey"
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
      <template
        #default="slotProps"
      >
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
} from 'pinia'
import layoutStore from '@/stores/layout'
import BaseSegmentContainer
  from '@/components/containers/segments/BaseSegmentContainer.vue'
import BaseOrderSelect from '@/components/selects/BaseOrderSelect.vue'
import BaseViewSelect from '@/components/selects/BaseViewSelect.vue'
import BasePaginatedSegmentContainer
  from '@/components/containers/segments/BasePaginatedSegmentContainer.vue'
import {
  generateKey
} from '@/helpers/utils'

export default {
  name: 'BasePaginatedPageContainer',
  components: {
    BaseSegmentContainer,
    BaseOrderSelect,
    BaseViewSelect,
    BasePaginatedSegmentContainer
  },
  inject: {
    setOrder: {
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
    isGetData: {
      type: Boolean,
      default: true
    },
    responseData: Object,
    isLoading: Boolean,
    error: Error,
    limit: Number,
    order: String,
    model: String,
    clientPageLimit: Number,
    responsePageLimit: Number,
    isPaginationSimple: Boolean,
    isWithTopSegment: Boolean,
    isWithOrderChange: Boolean,
    isWithViewChange: Boolean,
    viewId: String
  },
  data () {
    return {
      viewSelectKey: null,
      paginationKey: null,
      responseDataComputed: null
    }
  },
  computed: {
    ...mapState(
      layoutStore,
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
    order: 'handleOrderChange',
    viewId: 'handleViewIdChange',
    isWithInfiniteScroll:
      'handleIsWithInfiniteScrollChange',
    scope: 'handleScopeChange'
  },
  methods: {
    handleResponseDataChange (
      value
    ) {
      this.responseDataComputed = value
    },
    handleOrderSelect (
      value
    ) {
      this.setOrder(
        value
      )
    },
    handleOrderChange () {
      if (this.isGetData) {
        this.refresh()
      }
    },
    handleViewIdChange () {
      this.refresh()
    },
    handleIsWithInfiniteScrollChange () {
      this.refresh()
    },
    handleScopeChange () {
      this.viewSelectKey = generateKey()
    },
    handleFocus () {
      this.focus()
    },
    refresh () {
      this.reset()

      this.getData()
    },
    reset () {
      this.responseDataComputed = null

      this.paginationKey = generateKey()
    },
    focus () {
      this.$refs
        .pagination
        .focus()
    }
  }
}
</script>

<style lang="sass" scoped>
.top-section
  @extend .d-flex, .align-items-center, .justify-content-space-between

.top-left-section
  @extend .d-flex, .align-items-center

.top-right-section
  @extend .d-flex, .align-items-center
  margin-left: 1em

.select-block
  &:not(:first-child)
    margin-left: 0.75em
</style>

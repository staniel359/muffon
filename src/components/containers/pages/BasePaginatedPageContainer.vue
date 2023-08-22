<template>
  <div
    :class="[
      'ui raised segments main-segments',
      'main-segment-container',
      'main-page-segment-container'
    ]"
  >
    <BaseSegmentContainer
      v-if="isWithTopSegment"
    >
      <div class="main-page-top-section">
        <div class="section">
          <slot
            name="top"
          />
        </div>

        <div class="section">
          <div
            v-if="isWithOrderChange"
            class="section-item"
          >
            <BaseOrderSelect
              :order="order"
              :model="model"
              @select="handleOrderSelect"
            />
          </div>

          <div
            v-if="isWithViewChange"
            class="section-item"
          >
            <BaseViewSelect
              :key="viewSelectKey"
              :scope="viewScope"
              :view-id="viewId"
            />
          </div>

          <div
            v-if="isWithOptions"
            class="section-item"
          >
            <slot
              name="options"
            />
          </div>
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
    listScope: String,
    responseData: Object,
    isLoading: Boolean,
    error: Error,
    limit: Number,
    order: String,
    model: String,
    responsePageLimit: Number,
    isPaginationSimple: Boolean,
    isWithTopSegment: Boolean,
    isWithOrderChange: Boolean,
    isWithViewChange: Boolean,
    viewId: String,
    isWithOptions: Boolean
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
    ),
    viewScope () {
      return (
        this.listScope ||
          this.scope
      )
    }
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
    async refresh () {
      this.reset()

      this.getData()

      await this.$nextTick()

      this.setFocusable()
    },
    reset () {
      this.responseDataComputed = null

      this.paginationKey = generateKey()
    },
    focus () {
      this.$refs
        .pagination
        .focus()
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

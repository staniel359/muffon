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
        <div>
          <slot
            name="top"
          />
        </div>

        <BaseViewSelect
          v-if="isWithViewChange"
          :scope="scope"
          :view-id="viewId"
          @select="handleViewSelect"
        />
      </div>

      <div>
        <slot
          name="topExtra"
        />
      </div>
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
import BaseViewSelect from '@/components/selects/BaseViewSelect.vue'
import BasePaginatedSegmentContainer
  from '@/components/containers/segments/BasePaginatedSegmentContainer.vue'

export default {
  name: 'BasePaginatedPageContainer',
  components: {
    BaseSegmentContainer,
    BaseViewSelect,
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
.top-section
  @extend .d-flex, .align-items-center, .justify-content-space-between
</style>

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

      <BaseViewChangeButtons
        v-if="isWithViewChange"
        :view-index="viewIndex"
        @view-button-click="handleViewButtonClick"
      />
    </BaseSegmentContainer>

    <BasePaginatedSegmentContainer
      ref="pagination"
      class="main-paginated-page-segment-container"
      :slot-props-data="slotPropsData"
      :response-data-name="responseDataName"
      :scope="scope"
      :limit="limit"
      :client-page-limit="clientPageLimit"
      :response-page-limit="responsePageLimit"
      :is-pagination-simple="isPaginationSimple"
      :is-reset="isReset"
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
import BaseSegmentContainer
  from '*/components/containers/segments/BaseSegmentContainer.vue'
import BaseViewChangeButtons
  from '*/components/buttons/BaseViewChangeButtons.vue'
import BasePaginatedSegmentContainer
  from '*/components/containers/segments/BasePaginatedSegmentContainer.vue'

export default {
  name: 'BasePaginatedPageContainer',
  components: {
    BaseSegmentContainer,
    BaseViewChangeButtons,
    BasePaginatedSegmentContainer
  },
  inject: {
    setViewIndex: {
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
    slotPropsData: Object,
    responseDataName: String,
    limit: Number,
    clientPageLimit: Number,
    responsePageLimit: Number,
    isPaginationSimple: Boolean,
    isReset: Boolean,
    isWithTopSegment: Boolean,
    isWithViewChange: Boolean,
    viewIndex: Number
  },
  watch: {
    viewIndex: 'handleViewIndexChange'
  },
  methods: {
    handleViewButtonClick (
      value
    ) {
      this.setViewIndex(
        value
      )

      this.reset()
    },
    handleViewIndexChange () {
      this.getData()
    },
    handleFocus () {
      this.focus()
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

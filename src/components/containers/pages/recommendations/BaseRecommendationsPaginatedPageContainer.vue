<template>
  <BaseRecommendationsPageContainer
    ref="page"
    :scope="scope"
    :limit="limit"
    :order="order"
    :filter-args="filterArgs"
  >
    <template
      #default="pageSlotProps"
    >
      <BasePaginatedPageContainer
        ref="pagination"
        :response-data="pageSlotProps.recommendationsData"
        :is-loading="pageSlotProps.isLoading"
        :error="pageSlotProps.error"
        :scope="scope"
        :limit="limit"
        :order="order"
        :model="model"
        :is-with-top-segment="isWithTopSegment"
        :is-with-order-change="isWithOrderChange"
        :is-with-view-change="isWithViewChange"
        :view-id="viewId"
      >
        <template
          #top
        >
          <slot
            name="top"
          />
        </template>

        <template
          #topExtra
        >
          <slot
            name="topExtra"
          />
        </template>

        <template
          #default="slotProps"
        >
          <slot
            :[scope]="slotProps[scope]"
          />
        </template>
      </BasePaginatedPageContainer>
    </template>
  </BaseRecommendationsPageContainer>
</template>

<script>
import BaseRecommendationsPageContainer
  from './BaseRecommendationsPageContainer.vue'
import BasePaginatedPageContainer
  from '@/components/containers/pages/BasePaginatedPageContainer.vue'
import paginatedPageMixin from '@/mixins/paginatedPageMixin'

export default {
  name: 'BaseRecommendationsPaginatedPageContainer',
  components: {
    BaseRecommendationsPageContainer,
    BasePaginatedPageContainer
  },
  mixins: [
    paginatedPageMixin
  ],
  props: {
    scope: {
      type: String,
      required: true
    },
    limit: Number,
    order: String,
    model: String,
    isWithTopSegment: Boolean,
    isWithOrderChange: Boolean,
    isWithViewChange: Boolean,
    viewId: String,
    filterArgs: Object
  }
}
</script>

<style lang="sass" scoped></style>

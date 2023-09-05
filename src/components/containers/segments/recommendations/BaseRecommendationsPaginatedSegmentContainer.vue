<template>
  <BaseRecommendationsSegmentContainer
    :scope="scope"
    :limit="limit"
  >
    <template
      #default="pageSlotProps"
    >
      <BasePaginatedSegmentContainer
        ref="segment"
        :response-data="pageSlotProps.recommendationsData"
        :is-loading="pageSlotProps.isLoading"
        :error="pageSlotProps.error"
        :scope="scope"
        :limit="limit"
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
    </template>
  </BaseRecommendationsSegmentContainer>
</template>

<script>
import BaseRecommendationsSegmentContainer
  from './BaseRecommendationsSegmentContainer.vue'
import BasePaginatedSegmentContainer
  from '@/components/containers/segments/BasePaginatedSegmentContainer.vue'
import paginatedSegmentMixin from '@/mixins/paginatedSegmentMixin'

export default {
  name: 'BaseRecommendationsPaginatedSegmentContainer',
  components: {
    BaseRecommendationsSegmentContainer,
    BasePaginatedSegmentContainer
  },
  mixins: [
    paginatedSegmentMixin
  ],
  props: {
    scope: {
      type: String,
      required: true
    },
    limit: Number
  }
}
</script>

<style lang="sass" scoped></style>

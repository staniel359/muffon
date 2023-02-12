<template>
  <BaseHistorySegmentContainer
    ref="segment"
    :scope="scope"
    :limit="limit"
    :header-link="headerLink"
  >
    <template
      #default="segmentSlotProps"
    >
      <BasePaginatedSegmentContainer
        :response-data="segmentSlotProps.historyData"
        :is-loading="segmentSlotProps.isLoading"
        :error="segmentSlotProps.error"
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
  </BaseHistorySegmentContainer>
</template>

<script>
import BaseHistorySegmentContainer
  from './BaseHistorySegmentContainer.vue'
import BasePaginatedSegmentContainer
  from '@/components/containers/segments/BasePaginatedSegmentContainer.vue'
import paginatedSegmentMixin from '@/mixins/paginatedSegmentMixin'

export default {
  name: 'BaseHistoryPaginatedSegmentContainer',
  components: {
    BaseHistorySegmentContainer,
    BasePaginatedSegmentContainer
  },
  mixins: [
    paginatedSegmentMixin
  ],
  props: {
    scope: String,
    limit: Number,
    headerLink: Object
  }
}
</script>

<style lang="sass" scoped></style>

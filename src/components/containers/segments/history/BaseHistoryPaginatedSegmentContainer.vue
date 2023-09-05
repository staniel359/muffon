<template>
  <BaseHistorySegmentContainer
    :scope="scope"
    :list-scope="listScope"
    :limit="limit"
  >
    <template
      #default="pageSlotProps"
    >
      <BasePaginatedSegmentContainer
        ref="segment"
        :response-data="pageSlotProps.historyData"
        :is-loading="pageSlotProps.isLoading"
        :error="pageSlotProps.error"
        :scope="listScope"
        :limit="limit"
        :response-page-limit="pageSlotProps.responsePageLimit"
        @focus="handleFocus"
      >
        <template
          #default="slotProps"
        >
          <slot
            :[listScope]="slotProps[listScope]"
          />
        </template>
      </BasePaginatedSegmentContainer>
    </template>
  </BaseHistorySegmentContainer>
</template>

<script>
import BaseHistorySegmentContainer from './BaseHistorySegmentContainer.vue'
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
    listScope: {
      type: String,
      required: true
    },
    scope: String,
    limit: Number
  }
}
</script>

<style lang="sass" scoped></style>

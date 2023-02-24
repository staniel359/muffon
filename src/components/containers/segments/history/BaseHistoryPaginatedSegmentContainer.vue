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
        :scope="listScopeFormatted"
        :limit="limit"
        @focus="handleFocus"
      >
        <template
          #default="slotProps"
        >
          <slot
            :[listScopeFormatted]="slotProps[listScopeFormatted]"
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
    listScope: String,
    scope: String,
    limit: Number,
    headerLink: Object
  },
  computed: {
    listScopeFormatted () {
      return (
        this.listScope ||
          this.scope
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>

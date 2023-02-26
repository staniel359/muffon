<template>
  <BaseHistorySegmentContainer
    ref="segment"
    :scope="scope"
    :limit="limit"
    :header-link="headerLink"
    :is-get-data="isGetData"
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
        :response-page-limit="segmentSlotProps.responsePageLimit"
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
    isGetData: {
      type: Boolean,
      default: true
    },
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

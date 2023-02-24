<template>
  <BaseHistoryPageContainer
    ref="page"
    :scope="scope"
    :limit="limit"
    :order="order"
  >
    <template
      #default="pageSlotProps"
    >
      <BasePaginatedPageContainer
        :response-data="pageSlotProps.historyData"
        :is-loading="pageSlotProps.isLoading"
        :error="pageSlotProps.error"
        :scope="listScopeFormatted"
        :limit="limit"
        :order="order"
        :model="model"
        :is-with-top-segment="isWithTopSegment"
        :is-with-order-change="isWithOrderChange"
      >
        <template
          #default="slotProps"
        >
          <slot
            :[listScopeFormatted]="slotProps[listScopeFormatted]"
          />
        </template>
      </BasePaginatedPageContainer>
    </template>
  </BaseHistoryPageContainer>
</template>

<script>
import BaseHistoryPageContainer from './BaseHistoryPageContainer.vue'
import BasePaginatedPageContainer
  from '@/components/containers/pages/BasePaginatedPageContainer.vue'
import paginatedPageMixin from '@/mixins/paginatedPageMixin'

export default {
  name: 'BaseHistoryPaginatedPageContainer',
  components: {
    BaseHistoryPageContainer,
    BasePaginatedPageContainer
  },
  mixins: [
    paginatedPageMixin
  ],
  props: {
    listScope: String,
    scope: String,
    limit: Number,
    order: String,
    model: String,
    isWithTopSegment: Boolean,
    isWithOrderChange: Boolean
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

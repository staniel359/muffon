<template>
  <BaseHistoryPageContainer
    ref="page"
    :scope="scope"
    :limit="limit"
    :order="order"
    :is-get-data="isGetData"
  >
    <template
      #default="pageSlotProps"
    >
      <BasePaginatedPageContainer
        ref="pagination"
        :response-data="pageSlotProps.historyData"
        :is-loading="pageSlotProps.isLoading"
        :error="pageSlotProps.error"
        :scope="listScopeFormatted"
        :limit="limit"
        :order="order"
        :model="model"
        :is-with-top-segment="isWithTopSegment"
        :is-with-order-change="isWithOrderChange"
        :is-get-data="isGetData"
        :response-page-limit="pageSlotProps.responsePageLimit"
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
    isGetData: {
      type: Boolean,
      default: true
    },
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
  },
  watch: {
    order: 'handleOrderChange'
  },
  methods: {
    handleOrderChange () {
      this.reset()
    }
  }
}
</script>

<style lang="sass" scoped></style>

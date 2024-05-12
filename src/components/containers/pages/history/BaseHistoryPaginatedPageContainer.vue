<template>
  <BaseHistoryPageContainer
    ref="page"
    :scope="scope"
    :list-scope="listScope"
    :limit="limit"
    :order="order"
  >
    <template
      #default="pageSlotProps"
    >
      <BasePaginatedPageContainer
        ref="pagination"
        :response-data="pageSlotProps.historyData"
        :is-loading="pageSlotProps.isLoading"
        :error="pageSlotProps.error"
        :scope="listScope"
        :limit="limit"
        :order="order"
        :model="model"
        :is-with-top-segment="isWithTopSegment"
        :is-with-order-change="isWithOrderChange"
        :is-with-reload-button="isWithReloadButton"
        :response-page-limit="pageSlotProps.responsePageLimit"
      >
        <template
          #default="slotProps"
        >
          <slot
            :[listScope]="slotProps[listScope]"
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
    scope: String,
    listScope: String,
    limit: Number,
    order: String,
    model: String,
    isWithTopSegment: Boolean,
    isWithOrderChange: Boolean,
    isWithReloadButton: Boolean
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

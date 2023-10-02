<template>
  <BaseCommunitiesPageContainer
    ref="page"
    :limit="limit"
    :order="order"
  >
    <template
      #default="pageSlotProps"
    >
      <BasePaginatedPageContainer
        ref="pagination"
        :response-data="pageSlotProps.communitiesData"
        :is-loading="pageSlotProps.isLoading"
        :error="pageSlotProps.error"
        :scope="scope"
        :limit="limit"
        :order="order"
        :model="model"
        :is-with-top-segment="isWithTopSegment"
        :is-with-order-change="isWithOrderChange"
        :is-with-options="isWithOptions"
      >
        <template
          #top
        >
          <slot
            name="top"
          />
        </template>

        <template
          #options
        >
          <slot
            name="options"
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
  </BaseCommunitiesPageContainer>
</template>

<script>
import BaseCommunitiesPageContainer from './BaseCommunitiesPageContainer.vue'
import BasePaginatedPageContainer
  from '@/components/containers/pages/BasePaginatedPageContainer.vue'
import paginatedPageMixin from '@/mixins/paginatedPageMixin'

export default {
  name: 'BaseCommunitiesPaginatedPageContainer',
  components: {
    BaseCommunitiesPageContainer,
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
    isWithOptions: Boolean
  }
}
</script>

<style lang="sass" scoped></style>

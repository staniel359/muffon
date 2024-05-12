<template>
  <BaseCommunityPageContainer
    ref="page"
    :community-id="communityId"
    :scope="scope"
    :limit="limit"
    :order="order"
  >
    <template
      #default="pageSlotProps"
    >
      <BasePaginatedPageContainer
        :response-data="pageSlotProps.communityData"
        :is-loading="pageSlotProps.isLoading"
        :error="pageSlotProps.error"
        :scope="scope"
        :limit="limit"
        :order="order"
        :model="model"
        :is-with-top-segment="isWithTopSegment"
        :is-with-order-change="isWithOrderChange"
        :is-with-reload-button="isWithReloadButton"
      >
        <template
          #top
        >
          <slot
            name="top"
          />
        </template>

        <template
          #default="slotProps"
        >
          <slot
            :[scope]="slotProps[scope]"
            :is-community-creator="pageSlotProps.isCommunityCreator"
          />
        </template>
      </BasePaginatedPageContainer>
    </template>
  </BaseCommunityPageContainer>
</template>

<script>
import BaseCommunityPageContainer from './BaseCommunityPageContainer.vue'
import BasePaginatedPageContainer
  from '@/components/containers/pages/BasePaginatedPageContainer.vue'
import paginatedPageMixin from '@/mixins/paginatedPageMixin'

export default {
  name: 'BaseCommunityPaginatedPageContainer',
  components: {
    BaseCommunityPageContainer,
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
    communityId: String,
    limit: Number,
    order: String,
    model: String,
    isWithTopSegment: Boolean,
    isWithOrderChange: Boolean,
    isWithReloadButton: Boolean
  }
}
</script>

<style lang="sass" scoped></style>

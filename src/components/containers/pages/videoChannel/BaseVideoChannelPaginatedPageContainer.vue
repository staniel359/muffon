<template>
  <BaseVideoChannelPageContainer
    ref="page"
    :channel-id="channelId"
    :scope="scope"
    :limit="limit"
  >
    <template #default="pageSlotProps">
      <BasePaginatedPageContainer
        :response-data="pageSlotProps.channelData"
        :is-loading="pageSlotProps.isLoading"
        :error="pageSlotProps.error"
        :scope="scope"
        :limit="limit"
        is-pagination-simple
      >
        <template #default="slotProps">
          <slot
            :[scope]="slotProps[scope]"
          />
        </template>
      </BasePaginatedPageContainer>
    </template>
  </BaseVideoChannelPageContainer>
</template>

<script>
import BaseVideoChannelPageContainer
  from '@/components/containers/pages/videoChannel/BaseVideoChannelPageContainer.vue'
import BasePaginatedPageContainer
  from '@/components/containers/pages/BasePaginatedPageContainer.vue'
import paginatedPageMixin from '@/mixins/paginatedPageMixin'

export default {
  name: 'BaseVideoChannelPaginatedPageContainer',
  components: {
    BaseVideoChannelPageContainer,
    BasePaginatedPageContainer
  },
  mixins: [
    paginatedPageMixin
  ],
  props: {
    channelId: String,
    scope: String,
    limit: Number
  }
}
</script>

<style lang="sass" scoped></style>

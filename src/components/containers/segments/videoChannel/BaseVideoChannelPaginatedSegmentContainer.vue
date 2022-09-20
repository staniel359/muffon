<template>
  <BaseVideoChannelSegmentContainer
    ref="segment"
    :channel-id="channelId"
    :scope="scope"
    :limit="limit"
    :header-link="headerLink"
  >
    <template #default="segmentSlotProps">
      <BasePaginatedSegmentContainer
        :response-data="segmentSlotProps.channelData"
        :is-loading="segmentSlotProps.isLoading"
        :error="segmentSlotProps.error"
        :scope="scope"
        :limit="limit"
        :client-page-limit="clientPageLimit"
        :is-pagination-simple="isPaginationSimple"
        @focus="handleFocus"
      >
        <template #default="slotProps">
          <slot
            :[scope]="slotProps[scope]"
          />
        </template>
      </BasePaginatedSegmentContainer>
    </template>
  </BaseVideoChannelSegmentContainer>
</template>

<script>
import BaseVideoChannelSegmentContainer
  from './BaseVideoChannelSegmentContainer.vue'
import BasePaginatedSegmentContainer
  from '@/components/containers/segments/BasePaginatedSegmentContainer.vue'
import paginatedSegmentMixin from '@/mixins/paginatedSegmentMixin'

export default {
  name: 'BaseVideoChannelPaginatedSegmentContainer',
  components: {
    BaseVideoChannelSegmentContainer,
    BasePaginatedSegmentContainer
  },
  mixins: [
    paginatedSegmentMixin
  ],
  props: {
    channelId: String,
    scope: String,
    limit: Number,
    clientPageLimit: Number,
    headerLink: Object,
    isPaginationSimple: Boolean
  }
}
</script>

<style lang="sass" scoped></style>

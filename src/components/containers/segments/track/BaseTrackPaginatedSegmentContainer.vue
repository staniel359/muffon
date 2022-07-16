<template>
  <BaseTrackSegmentContainer
    ref="segment"
    :artist-name="artistName"
    :track-title="trackTitle"
    :scope="scope"
    :limit="limit"
    :header-link="headerLink"
  >
    <template #default="segmentSlotProps">
      <BasePaginatedSegmentContainer
        :response-data="segmentSlotProps.trackData"
        :is-loading="segmentSlotProps.isLoading"
        :error="segmentSlotProps.error"
        :scope="scope"
        :limit="limit"
        :is-change-transparency="false"
        @focus="handleFocus"
      >
        <template #default="slotProps">
          <slot
            :[scope]="slotProps[scope]"
          />
        </template>
      </BasePaginatedSegmentContainer>
    </template>
  </BaseTrackSegmentContainer>
</template>

<script>
import BaseTrackSegmentContainer from './BaseTrackSegmentContainer.vue'
import BasePaginatedSegmentContainer
  from '*/components/containers/segments/BasePaginatedSegmentContainer.vue'
import paginatedSegmentMixin from '*/mixins/paginatedSegmentMixin'

export default {
  name: 'BaseTrackPaginatedSegmentContainer',
  components: {
    BaseTrackSegmentContainer,
    BasePaginatedSegmentContainer
  },
  mixins: [
    paginatedSegmentMixin
  ],
  props: {
    artistName: String,
    trackTitle: String,
    scope: String,
    limit: Number,
    headerLink: Object
  }
}
</script>

<style lang="sass" scoped></style>

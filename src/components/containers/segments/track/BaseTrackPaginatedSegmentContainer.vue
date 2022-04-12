<template>
  <BaseTrackSegmentContainer
    ref="segment"
    :artistName="artistName"
    :trackTitle="trackTitle"
    :scope="scope"
    :limit="limit"
    :headerLink="headerLink"
  >
    <template #default="segmentSlotProps">
      <BasePaginatedSegmentContainer
        responseDataName="trackData"
        :slotPropsData="segmentSlotProps"
        :scope="scope"
        :limit="limit"
        @focus="handleFocus"
      >
        <template #default="slotProps">
          <slot
            :[scope]="slotProps[scope]"
            :profileId="segmentSlotProps.profileId"
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

export default {
  name: 'BaseTrackPaginatedSegmentContainer',
  components: {
    BaseTrackSegmentContainer,
    BasePaginatedSegmentContainer
  },
  props: {
    artistName: String,
    trackTitle: String,
    scope: String,
    limit: Number,
    headerLink: Object
  },
  methods: {
    handleFocus () {
      this.$refs.segment.focus()
    }
  }
}
</script>

<style lang="sass" scoped></style>

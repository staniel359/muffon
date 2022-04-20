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
        response-data-name="trackData"
        :slot-props-data="segmentSlotProps"
        :scope="scope"
        :limit="limit"
        @focus="handleFocus"
      >
        <template #default="slotProps">
          <slot
            :[scope]="slotProps[scope]"
            :profile-id="segmentSlotProps.profileId"
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
      this.focus()
    },
    focus () {
      this.$refs
        .segment
        .focus()
    }
  }
}
</script>

<style lang="sass" scoped></style>

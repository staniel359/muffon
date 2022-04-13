<template>
  <BaseArtistSegmentContainer
    ref="segment"
    :artist-name="artistName"
    :scope="scope"
    :limit="limit"
    :header-link="headerLink"
  >
    <template #default="segmentSlotProps">
      <BasePaginatedSegmentContainer
        response-data-name="artistData"
        :slot-props-data="segmentSlotProps"
        :scope="scope"
        :limit="limit"
        @focus="handleFocus"
      >
        <template #default="slotProps">
          <slot
            :[scope]="slotProps[scope]"
            :top-track-count="segmentSlotProps.topTrackCount"
            :profile-id="slotProps.profileId"
          />
        </template>
      </BasePaginatedSegmentContainer>
    </template>
  </BaseArtistSegmentContainer>
</template>

<script>
import BaseArtistSegmentContainer from './BaseArtistSegmentContainer.vue'
import BasePaginatedSegmentContainer
  from '*/components/containers/segments/BasePaginatedSegmentContainer.vue'

export default {
  name: 'BaseArtistPaginatedSegmentContainer',
  components: {
    BaseArtistSegmentContainer,
    BasePaginatedSegmentContainer
  },
  props: {
    artistName: String,
    scope: String,
    limit: Number,
    headerLink: Object
  },
  methods: {
    handleFocus () {
      this.$refs
        .segment
        .focus()
    }
  }
}
</script>

<style lang="sass" scoped></style>

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
      <BaseSegmentContainer
        class="segment-container"
        :isLoading="segmentSlotProps.isLoading"
      >
        <BasePaginatedListContainer
          :isLoading="segmentSlotProps.isLoading"
          :error="segmentSlotProps.error"
          :responseData="segmentSlotProps.trackData"
          :scope="scope"
          :limit="limit"
          @fetchData="segmentSlotProps.fetchData"
          @refresh="segmentSlotProps.handleRefresh"
          @focus="handleFocus"
        >
          <template #default="slotProps">
            <slot
              :[scope]="slotProps[scope]"
              :profileId="segmentSlotProps.profileId"
            />
          </template>
        </BasePaginatedListContainer>
      </BaseSegmentContainer>
    </template>
  </BaseTrackSegmentContainer>
</template>

<script>
import BaseTrackSegmentContainer from './BaseTrackSegmentContainer.vue'
import BaseSegmentContainer
  from '*/components/containers/segments/BaseSegmentContainer.vue'
import BasePaginatedListContainer
  from '*/components/containers/lists/BasePaginatedListContainer.vue'

export default {
  name: 'BaseTrackPaginatedSegmentContainer',
  components: {
    BaseTrackSegmentContainer,
    BaseSegmentContainer,
    BasePaginatedListContainer
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

<style lang="sass" scoped>
.segment-container
  @extend .d-flex
</style>

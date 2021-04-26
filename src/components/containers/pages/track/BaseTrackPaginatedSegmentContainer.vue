<template>
  <BaseTrackSegmentContainer
    ref="segment"
    :artistName="artistName"
    :trackTitle="trackTitle"
    :scope="scope"
    :responsePageLimit="responsePageLimit"
    :headerTextKey="headerTextKey"
    :formatHeaderLink="formatHeaderLink"
  >
    <template #default="segmentSlotProps">
      <BaseSegmentContainer
        :isLoading="segmentSlotProps.isLoading"
        class="segment-container"
      >
        <BasePaginatedContainer
          :responseData="segmentSlotProps.trackData"
          :error="segmentSlotProps.error"
          :scope="scope"
          :clientPageLimit="clientPageLimit"
          :responsePageLimit="responsePageLimit"
          @fetchData="segmentSlotProps.fetchData"
          @refresh="segmentSlotProps.handleRefresh"
          @focus="handleFocus"
        >
          <template #default="slotProps">
            <slot :[scope]="slotProps[scope]" />
          </template>
        </BasePaginatedContainer>
      </BaseSegmentContainer>
    </template>
  </BaseTrackSegmentContainer>
</template>

<script>
import BaseTrackSegmentContainer from './BaseTrackSegmentContainer.vue'
import BaseSegmentContainer from '@/containers/BaseSegmentContainer.vue'
import BasePaginatedContainer from '@/containers/BasePaginatedContainer.vue'

export default {
  name: 'BaseTrackPaginatedSegmentContainer',
  components: {
    BaseTrackSegmentContainer,
    BaseSegmentContainer,
    BasePaginatedContainer
  },
  props: {
    artistName: String,
    trackTitle: String,
    scope: String,
    clientPageLimit: Number,
    responsePageLimit: Number,
    headerTextKey: String,
    formatHeaderLink: Function
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

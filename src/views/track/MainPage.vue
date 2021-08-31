<template>
  <BaseTrackPageContainer>
    <template #default="slotProps">
      <div
        :class="[
          'ui segments',
          'main-segment-container',
          'main-page-segment-container'
        ]"
      >
        <BaseSegmentContainer>
          <TrackSourceSelect
            :trackData="slotProps.trackData"
          />
        </BaseSegmentContainer>

        <BaseSegmentContainer
          class="track-segment"
          :isLoading="slotProps.isLoading"
          :error="slotProps.error"
          @refresh="slotProps.handleRefresh"
        >
          <TrackPageContent
            :trackData="slotProps.trackData"
          />
        </BaseSegmentContainer>
      </div>
    </template>
  </BaseTrackPageContainer>
</template>

<script>
import BaseTrackPageContainer
  from '@/containers/pages/track/BaseTrackPageContainer.vue'
import BaseSegmentContainer from '@/containers/BaseSegmentContainer.vue'
import TrackSourceSelect from './MainPage/TrackSourceSelect.vue'
import TrackPageContent from './MainPage/TrackPageContent.vue'

export default {
  name: 'MainPage',
  components: {
    BaseTrackPageContainer,
    BaseSegmentContainer,
    TrackSourceSelect,
    TrackPageContent
  }
}
</script>

<style lang="sass" scoped>
.main-page-segment-container
  @extend .d-flex

.track-segment
  @extend .flex-full
</style>

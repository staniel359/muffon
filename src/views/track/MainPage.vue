<template>
  <BaseTrackPageContainer>
    <template #default="slotProps">
      <BaseSegmentContainer
        :class="[
          'main-segment-container',
          'main-page-segment-container'
        ]"
        :isLoading="slotProps.isLoading"
        :error="slotProps.error"
        @refresh="slotProps.handleRefresh"
      >
        <TrackPageContent
          :trackData="slotProps.trackData"
        />
      </BaseSegmentContainer>
    </template>
  </BaseTrackPageContainer>
</template>

<script>
import BaseTrackPageContainer
  from '@/containers/pages/track/BaseTrackPageContainer.vue'
import BaseSegmentContainer from '@/containers/BaseSegmentContainer.vue'
import TrackPageContent from './MainPage/TrackPageContent.vue'

export default {
  name: 'MainPage',
  components: {
    BaseTrackPageContainer,
    BaseSegmentContainer,
    TrackPageContent
  }
}
</script>

<style lang="sass" scoped></style>

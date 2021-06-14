<template>
  <BaseChannelPageContainer
    :responsePageLimit="50"
  >
    <template #default="slotProps">
      <BaseSegmentContainer
        :class="[
          'main-segment-container',
          'main-page-segment-container'
        ]"
        :isLoading="slotProps.isLoading"
        :error="slotProps.error"
      >
        <VideosList
          :channelData="slotProps.channelData"
          @prevPageButtonClick="slotProps.fetchData"
          @nextPageButtonClick="slotProps.fetchData"
        />
      </BaseSegmentContainer>
    </template>
  </BaseChannelPageContainer>
</template>

<script>
import BaseChannelPageContainer
  from '@/containers/pages/video/BaseChannelPageContainer.vue'
import BaseSegmentContainer from '@/containers/BaseSegmentContainer.vue'
import VideosList from './VideosPage/VideosList.vue'

export default {
  name: 'VideosPage',
  components: {
    BaseChannelPageContainer,
    BaseSegmentContainer,
    VideosList
  }
}
</script>

<style lang="sass" scoped>
.main-page-segment-container
  @extend .d-flex, .flex-column
</style>

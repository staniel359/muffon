<template>
  <BaseVideoPageContainer>
    <template #default="slotProps">
      <BaseSegmentContainer
        :class="[
          'raised',
          'main-segment-container',
          'main-page-segment-container'
        ]"
      >
        <VideoData
          :videoData="slotProps.videoData"
        />

        <VideoInfoData
          :videoData="slotProps.videoData"
        />
      </BaseSegmentContainer>
    </template>
  </BaseVideoPageContainer>
</template>

<script>
import BaseVideoPageContainer
  from '@/containers/pages/video/BaseVideoPageContainer.vue'
import BaseSegmentContainer
  from '@/containers/segments/BaseSegmentContainer.vue'
import VideoData from './MainPage/VideoData.vue'
import VideoInfoData from './MainPage/VideoInfoData.vue'

export default {
  name: 'MainPage',
  components: {
    BaseVideoPageContainer,
    BaseSegmentContainer,
    VideoData,
    VideoInfoData
  }
}
</script>

<style lang="sass" scoped></style>

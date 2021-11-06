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
        <BaseVideosPaginatedList
          :videosData="slotProps.channelData"
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
import BaseVideosPaginatedList
  from '@/lists/videos/BaseVideosPaginatedList.vue'

export default {
  name: 'VideosPage',
  components: {
    BaseChannelPageContainer,
    BaseSegmentContainer,
    BaseVideosPaginatedList
  }
}
</script>

<style lang="sass" scoped>
.main-page-segment-container
  @extend .d-flex, .flex-column
</style>

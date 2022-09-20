<template>
  <BaseVideoChannelPageContainer
    ref="page"
    :channel-id="channelId"
  >
    <template #default="pageSlotProps">
      <InfoSegment
        :channel-data="pageSlotProps.channelData"
      />

      <VideosSegment
        :channel-id="channelId"
      />
    </template>
  </BaseVideoChannelPageContainer>
</template>

<script>
import BaseVideoChannelPageContainer
  from '@/components/containers/pages/video/BaseVideoChannelPageContainer.vue'
import InfoSegment from './MainPage/InfoSegment.vue'
import VideosSegment from './MainPage/VideosSegment.vue'

export default {
  name: 'MainPage',
  components: {
    BaseVideoChannelPageContainer,
    InfoSegment,
    VideosSegment
  },
  props: {
    channelId: String
  }
}
</script>

<style lang="sass" scoped></style>

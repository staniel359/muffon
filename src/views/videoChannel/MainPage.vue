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

      <PlaylistsSegment
        :channel-id="channelId"
      />
    </template>
  </BaseVideoChannelPageContainer>
</template>

<script>
import BaseVideoChannelPageContainer
  from '@/components/containers/pages/videoChannel/BaseVideoChannelPageContainer.vue'
import InfoSegment from './MainPage/InfoSegment.vue'
import VideosSegment from './MainPage/VideosSegment.vue'
import PlaylistsSegment from './MainPage/PlaylistsSegment.vue'

export default {
  name: 'MainPage',
  components: {
    BaseVideoChannelPageContainer,
    InfoSegment,
    VideosSegment,
    PlaylistsSegment
  },
  props: {
    channelId: String
  }
}
</script>

<style lang="sass" scoped></style>

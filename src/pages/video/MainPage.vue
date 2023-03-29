<template>
  <BaseVideoPageContainer
    :video-id="videoId"
  >
    <template
      #default="slotProps"
    >
      <InfoSegment
        :video-data="slotProps.videoData"
      />

      <TabsSegment
        :video-id="videoId"
      />
    </template>
  </BaseVideoPageContainer>
</template>

<script>
import BaseVideoPageContainer
  from '@/components/containers/pages/video/BaseVideoPageContainer.vue'
import InfoSegment from './MainPage/InfoSegment.vue'
import TabsSegment from './MainPage/TabsSegment.vue'

export default {
  name: 'MainPage',
  components: {
    BaseVideoPageContainer,
    InfoSegment,
    TabsSegment
  },
  props: {
    videoId: String
  }
}
</script>

<style lang="sass" scoped></style>

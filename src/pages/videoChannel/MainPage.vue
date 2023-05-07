<template>
  <BaseVideoChannelPageContainer
    :key="refreshKey"
    :channel-id="channelId"
  >
    <template
      #default="slotProps"
    >
      <InfoSegment
        :channel-data="slotProps.channelData"
      />

      <TabsSegment
        :channel-id="channelId"
      />
    </template>
  </BaseVideoChannelPageContainer>
</template>

<script>
import BaseVideoChannelPageContainer
  from '@/components/containers/pages/videoChannel/BaseVideoChannelPageContainer.vue'
import InfoSegment from './MainPage/InfoSegment.vue'
import TabsSegment from './MainPage/TabsSegment.vue'
import pageMixin from '@/mixins/pageMixin'

export default {
  name: 'MainPage',
  components: {
    BaseVideoChannelPageContainer,
    InfoSegment,
    TabsSegment
  },
  mixins: [
    pageMixin
  ],
  props: {
    channelId: String
  }
}
</script>

<style lang="sass" scoped></style>

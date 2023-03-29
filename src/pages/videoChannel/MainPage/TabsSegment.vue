<template>
  <BaseTabsSegmentContainer
    :tabs="tabs"
  >
    <template
      #default="slotProps"
    >
      <Component
        :is="slotProps.component"
        :class="slotProps.class"
        :is-active="slotProps.isActive"
        :channel-id="channelId"
        @focus="slotProps.handleFocus"
      />
    </template>
  </BaseTabsSegmentContainer>
</template>

<script>
import BaseTabsSegmentContainer
  from '@/components/containers/segments/tabs/BaseTabsSegmentContainer.vue'
import VideosTab from './TabsSegment/VideosTab.vue'
import PlaylistsTab from './TabsSegment/PlaylistsTab.vue'

export default {
  name: 'TabsSegment',
  components: {
    BaseTabsSegmentContainer,
    VideosTab,
    PlaylistsTab
  },
  props: {
    channelId: String
  },
  data () {
    return {
      tabs: [
        {
          nameCode: 'navigation.videos',
          component: 'VideosTab'
        },
        {
          nameCode: 'navigation.playlists',
          component: 'PlaylistsTab'
        }
      ]
    }
  }
}
</script>

<style lang="sass" scoped></style>

<template>
  <BaseTabsSegmentContainer
    :tabs="tabs"
    is-attached
  >
    <template
      #default="slotProps"
    >
      <Component
        :is="slotProps.component"
        :class="slotProps.class"
        :is-active="slotProps.isActive"
        :profile-id="profileId"
        @focus="slotProps.handleFocus"
      />
    </template>
  </BaseTabsSegmentContainer>
</template>

<script>
import BaseTabsSegmentContainer
  from '@/components/containers/segments/tabs/BaseTabsSegmentContainer.vue'
import ArtistsTab from './TabsSegment/ArtistsTab.vue'
import AlbumsTab from './TabsSegment/AlbumsTab.vue'
import TracksTab from './TabsSegment/TracksTab.vue'
import VideosTab from './TabsSegment/VideosTab.vue'

export default {
  name: 'TabsSegment',
  components: {
    BaseTabsSegmentContainer,
    ArtistsTab,
    AlbumsTab,
    TracksTab,
    VideosTab
  },
  props: {
    profileId: Number
  },
  data () {
    return {
      tabs: [
        {
          nameCode: 'navigation.artists',
          component: 'ArtistsTab'
        },
        {
          nameCode: 'navigation.albums',
          component: 'AlbumsTab'
        },
        {
          nameCode: 'navigation.tracks',
          component: 'TracksTab'
        },
        {
          nameCode: 'navigation.videos',
          component: 'VideosTab'
        }
      ]
    }
  }
}
</script>

<style lang="sass" scoped></style>

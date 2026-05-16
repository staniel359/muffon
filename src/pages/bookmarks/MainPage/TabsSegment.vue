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
import VideoChannelsTab from './TabsSegment/VideoChannelsTab.vue'
import VideoPlaylistsTab from './TabsSegment/VideoPlaylistsTab.vue'

export default {
  name: 'TabsSegment',
  components: {
    BaseTabsSegmentContainer,
    BaseTabsSegmentContainer,
    ArtistsTab,
    AlbumsTab,
    TracksTab,
    VideosTab,
    VideoChannelsTab,
    VideoPlaylistsTab
  },
  props: {
    bookmarksData: {
      type: Object,
      required: true
    }
  },
  computed: {
    tabs () {
      return [
        {
          nameCode: 'navigation.artists',
          component: 'ArtistsTab',
          counter: this.bookmarksData.artists_count
        },
        {
          nameCode: 'navigation.albums',
          component: 'AlbumsTab',
          counter: this.bookmarksData.albums_count
        },
        {
          nameCode: 'navigation.tracks',
          component: 'TracksTab',
          counter: this.bookmarksData.tracks_count
        },
        {
          nameCode: 'navigation.videos',
          component: 'VideosTab',
          counter: this.bookmarksData.videos_count
        },
        {
          nameCode: 'navigation.videoChannels',
          component: 'VideoChannelsTab',
          counter: this.bookmarksData.video_channels_count
        },
        {
          nameCode: 'navigation.videoPlaylists',
          component: 'VideoPlaylistsTab',
          counter: this.bookmarksData.video_playlists_count
        }
      ]
    }
  }
}
</script>

<style lang="sass" scoped></style>

<template>
  <BaseBookmarksPageContainer
    :is-get-data="false"
  >
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
  </BaseBookmarksPageContainer>
</template>

<script>
import BaseBookmarksPageContainer
  from '@/components/containers/pages/bookmarks/BaseBookmarksPageContainer.vue'
import BaseTabsSegmentContainer
  from '@/components/containers/segments/tabs/BaseTabsSegmentContainer.vue'
import ArtistsTab from './MainPage/ArtistsTab.vue'
import AlbumsTab from './MainPage/AlbumsTab.vue'
import TracksTab from './MainPage/TracksTab.vue'
import VideosTab from './MainPage/VideosTab.vue'
import VideoChannelsTab from './MainPage/VideoChannelsTab.vue'
import VideoPlaylistsTab from './MainPage/VideoPlaylistsTab.vue'

export default {
  name: 'MainPage',
  components: {
    BaseBookmarksPageContainer,
    BaseTabsSegmentContainer,
    ArtistsTab,
    AlbumsTab,
    TracksTab,
    VideosTab,
    VideoChannelsTab,
    VideoPlaylistsTab
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
        },
        {
          nameCode: 'navigation.videoChannels',
          component: 'VideoChannelsTab'
        },
        {
          nameCode: 'navigation.videoPlaylists',
          component: 'VideoPlaylistsTab'
        }
      ]
    }
  }
}
</script>

<style lang="sass" scoped></style>

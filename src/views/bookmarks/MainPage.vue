<template>
  <BaseBookmarksPageContainer
    :is-get-data="false"
  >
    <ArtistsSegment />

    <AlbumsSegment />

    <TracksSegment />

    <VideosSegment />

    <VideoChannelsSegment />

    <VideoPlaylistsSegment />
  </BaseBookmarksPageContainer>
</template>

<script>
import BaseBookmarksPageContainer
  from '@/components/containers/pages/bookmarks/BaseBookmarksPageContainer.vue'
import ArtistsSegment from './MainPage/ArtistsSegment.vue'
import AlbumsSegment from './MainPage/AlbumsSegment.vue'
import TracksSegment from './MainPage/TracksSegment.vue'
import VideosSegment from './MainPage/VideosSegment.vue'
import VideoChannelsSegment from './MainPage/VideoChannelsSegment.vue'
import VideoPlaylistsSegment from './MainPage/VideoPlaylistsSegment.vue'

export default {
  name: 'MainPage',
  components: {
    BaseBookmarksPageContainer,
    ArtistsSegment,
    AlbumsSegment,
    TracksSegment,
    VideosSegment,
    VideoChannelsSegment,
    VideoPlaylistsSegment
  }
}
</script>

<style lang="sass" scoped></style>

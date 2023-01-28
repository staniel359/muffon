<template>
  <BaseBookmarksPageContainer
    :is-get-data="false"
  >
    <ArtistsSegment />

    <AlbumsSegment />

    <TracksSegment />

    <VideosSegment />
  </BaseBookmarksPageContainer>
</template>

<script>
import BaseBookmarksPageContainer
  from '@/components/containers/pages/bookmarks/BaseBookmarksPageContainer.vue'
import ArtistsSegment from './MainPage/ArtistsSegment.vue'
import AlbumsSegment from './MainPage/AlbumsSegment.vue'
import TracksSegment from './MainPage/TracksSegment.vue'
import VideosSegment from './MainPage/VideosSegment.vue'

export default {
  name: 'MainPage',
  components: {
    BaseBookmarksPageContainer,
    ArtistsSegment,
    AlbumsSegment,
    TracksSegment,
    VideosSegment
  }
}
</script>

<style lang="sass" scoped></style>

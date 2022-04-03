<template>
  <BaseBookmarksPageContainer>
    <ArtistsSegment />

    <AlbumsSegment />

    <TracksSegment />
  </BaseBookmarksPageContainer>
</template>

<script>
import BaseBookmarksPageContainer
  from '*/components/containers/pages/bookmarks/BaseBookmarksPageContainer.vue'
import ArtistsSegment from './MainPage/ArtistsSegment.vue'
import AlbumsSegment from './MainPage/AlbumsSegment.vue'
import TracksSegment from './MainPage/TracksSegment.vue'

export default {
  name: 'MainPage',
  components: {
    BaseBookmarksPageContainer,
    ArtistsSegment,
    AlbumsSegment,
    TracksSegment
  }
}
</script>

<style lang="sass" scoped></style>

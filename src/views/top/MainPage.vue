<template>
  <BaseTopPageContainer
    :is-get-data="false"
  >
    <ArtistsSegment />

    <AlbumsSegment />

    <TracksSegment />

    <TagsSegment />
  </BaseTopPageContainer>
</template>

<script>
import BaseTopPageContainer
  from '*/components/containers/pages/top/BaseTopPageContainer.vue'
import ArtistsSegment from './MainPage/ArtistsSegment.vue'
import AlbumsSegment from './MainPage/AlbumsSegment.vue'
import TracksSegment from './MainPage/TracksSegment.vue'
import TagsSegment from './MainPage/TagsSegment.vue'

export default {
  name: 'MainPage',
  components: {
    BaseTopPageContainer,
    ArtistsSegment,
    AlbumsSegment,
    TracksSegment,
    TagsSegment
  }
}
</script>

<style lang="sass" scoped></style>

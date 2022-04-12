<template>
  <BaseTopPageContainer
    :isFetchData="false"
  >
    <ArtistsSegment />

    <TracksSegment />

    <TagsSegment />
  </BaseTopPageContainer>
</template>

<script>
import BaseTopPageContainer
  from '*/components/containers/pages/top/BaseTopPageContainer.vue'
import ArtistsSegment from './MainPage/ArtistsSegment.vue'
import TracksSegment from './MainPage/TracksSegment.vue'
import TagsSegment from './MainPage/TagsSegment.vue'

export default {
  name: 'MainPage',
  components: {
    BaseTopPageContainer,
    ArtistsSegment,
    TracksSegment,
    TagsSegment
  }
}
</script>

<style lang="sass" scoped></style>

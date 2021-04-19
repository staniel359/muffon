<template>
  <div class="right-column">
    <InfoSegment :artistName="artistName" />
    <TracksSegment :artistName="artistName" />
    <AlbumsSegment :artistName="artistName" />
    <SimilarSegment :artistName="artistName" />
  </div>
</template>

<script>
import InfoSegment from './RightColumn/InfoSegment.vue'
import TracksSegment from './RightColumn/TracksSegment.vue'
import AlbumsSegment from './RightColumn/AlbumsSegment.vue'
import SimilarSegment from './RightColumn/SimilarSegment.vue'

export default {
  name: 'RightColumn',
  components: {
    InfoSegment,
    TracksSegment,
    AlbumsSegment,
    SimilarSegment
  },
  props: {
    artistName: String
  }
}
</script>

<style lang="sass" scoped>
.right-column
  @extend .flex-full
</style>

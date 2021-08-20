<template>
  <div class="artist-page-right-column">
    <InfoSegment :artistData="artistData" />
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
    artistData: Object
  },
  computed: {
    artistName () {
      return this.artistData.name
    }
  }
}
</script>

<style lang="sass" scoped>
.artist-page-right-column
  @extend .flex-full
  margin-left: 1.5em
</style>

<template>
  <div class="main-profile-page-right-column">
    <StatisticsSegment
      :album-data="albumData"
    />

    <TracksSegment
      :profile-id="profileId"
      :library-album-id="libraryAlbumId"
    />

    <PlaylistsSegment
      :profile-id="profileId"
      :library-album-id="libraryAlbumId"
    />
  </div>
</template>

<script>
import StatisticsSegment from './RightColumn/StatisticsSegment.vue'
import TracksSegment from './RightColumn/TracksSegment.vue'
import PlaylistsSegment from './RightColumn/PlaylistsSegment.vue'

export default {
  name: 'RightColumn',
  components: {
    StatisticsSegment,
    TracksSegment,
    PlaylistsSegment
  },
  props: {
    albumData: Object,
    profileId: String,
    libraryAlbumId: String
  }
}
</script>

<style lang="sass" scoped></style>

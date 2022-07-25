<template>
  <div class="main-profile-page-right-column">
    <StatisticsSegment
      :track-data="trackData"
    />

    <AlbumsSegment
      :profile-id="profileId"
      :library-track-id="libraryTrackId"
    />

    <PlaylistsSegment
      :profile-id="profileId"
      :library-track-id="libraryTrackId"
    />
  </div>
</template>

<script>
import StatisticsSegment from './RightColumn/StatisticsSegment.vue'
import AlbumsSegment from './RightColumn/AlbumsSegment.vue'
import PlaylistsSegment from './RightColumn/PlaylistsSegment.vue'

export default {
  name: 'RightColumn',
  components: {
    StatisticsSegment,
    AlbumsSegment,
    PlaylistsSegment
  },
  props: {
    trackData: Object,
    profileId: String,
    libraryTrackId: String
  }
}
</script>

<style lang="sass" scoped></style>

<template>
  <div class="main-profile-page-right-column">
    <PlayerSegment
      :track-data="trackData"
    />

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
import PlayerSegment from './RightColumn/PlayerSegment.vue'
import StatisticsSegment from './RightColumn/StatisticsSegment.vue'
import AlbumsSegment from './RightColumn/AlbumsSegment.vue'
import PlaylistsSegment from './RightColumn/PlaylistsSegment.vue'

export default {
  name: 'RightColumn',
  components: {
    PlayerSegment,
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

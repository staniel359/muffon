<template>
  <div class="main-profile-page-right-column">
    <StatisticsSegment
      :artist-data="artistData"
    />

    <AlbumsSegment
      :profile-id="profileId"
      :library-artist-id="libraryArtistId"
    />

    <TracksSegment
      :profile-id="profileId"
      :library-artist-id="libraryArtistId"
    />

    <PlaylistsSegment
      :profile-id="profileId"
      :library-artist-id="libraryArtistId"
    />
  </div>
</template>

<script>
import StatisticsSegment from './RightColumn/StatisticsSegment.vue'
import AlbumsSegment from './RightColumn/AlbumsSegment.vue'
import TracksSegment from './RightColumn/TracksSegment.vue'
import PlaylistsSegment from './RightColumn/PlaylistsSegment.vue'

export default {
  name: 'RightColumn',
  components: {
    StatisticsSegment,
    AlbumsSegment,
    TracksSegment,
    PlaylistsSegment
  },
  props: {
    artistData: Object,
    profileId: String,
    libraryArtistId: String
  }
}
</script>

<style lang="sass" scoped></style>

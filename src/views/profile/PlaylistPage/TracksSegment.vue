<template>
  <BasePlaylistPaginatedSegmentContainer
    class="tracks-segment"
    headerTextKey="tracks"
    scope="tracks"
    :profileId="profileId"
    :playlistId="playlistId"
    :clientPageLimit="50"
    :responsePageLimit="50"
  >
    <template #default="slotProps">
      <BaseTracksSimpleList
        :tracks="slotProps.tracks"
        :playlistTitle="playlistTitle"
        :playlistId="playlistId"
        isWithImage
        isWithArtistName
        isWithAlbumTitle
        isPlaylistTrack
        isWithDeleteOption
      />
    </template>
  </BasePlaylistPaginatedSegmentContainer>
</template>

<script>
import BasePlaylistPaginatedSegmentContainer
  from '@/containers/pages/profile/playlists/playlist/BasePlaylistPaginatedSegmentContainer.vue'
import BaseTracksSimpleList from '@/lists/tracks/BaseTracksSimpleList.vue'

export default {
  name: 'TracksSegment',
  components: {
    BasePlaylistPaginatedSegmentContainer,
    BaseTracksSimpleList
  },
  props: {
    profileId: String,
    playlistId: String,
    playlistTitle: String
  }
}
</script>

<style lang="sass" scoped>
.tracks-segment
  @extend .flex-full, .d-flex, .flex-column
</style>

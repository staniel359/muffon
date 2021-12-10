<template>
  <BasePlaylistPaginatedSegmentContainer
    class="tracks-segment"
    headerTextKey="tracks"
    scope="tracks"
    :profileId="profileId"
    :playlistId="playlistId"
    :clientPageLimit="limit"
    :responsePageLimit="limit"
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
  from '@/containers/segments/playlist/BasePlaylistPaginatedSegmentContainer.vue'
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
  },
  data () {
    return {
      limit: 50
    }
  }
}
</script>

<style lang="sass" scoped>
.tracks-segment
  @extend .flex-full, .d-flex, .flex-column
</style>

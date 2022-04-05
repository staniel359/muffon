<template>
  <BasePlaylistPaginatedSegmentContainer
    scope="tracks"
    :profileId="profileId"
    :playlistId="playlistId"
    :limit="limit"
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
  from '*/components/containers/segments/playlist/BasePlaylistPaginatedSegmentContainer.vue'
import BaseTracksSimpleList
  from '*/components/lists/tracks/BaseTracksSimpleList.vue'

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

<style lang="sass" scoped></style>

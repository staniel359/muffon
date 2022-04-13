<template>
  <BasePlaylistPaginatedSegmentContainer
    class="main-paginated-page-segment-container"
    :profile-id="profileId"
    :playlist-id="playlistId"
    :scope="scope"
    :limit="limit"
  >
    <template #default="slotProps">
      <BaseTracksSimpleList
        :tracks="slotProps[scope]"
        :playlist-title="playlistTitle"
        :playlist-id="playlistId"
        is-with-image
        is-with-artist-name
        is-with-album-title
        is-playlist-track
        is-with-delete-option
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
      limit: 50,
      scope: 'tracks'
    }
  }
}
</script>

<style lang="sass" scoped></style>

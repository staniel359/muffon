<template>
  <BasePlaylistPageContainer
    :profileId="profileId"
    :playlistId="playlistId"
  >
    <template #default="pageSlotProps">
      <div
        :class="[
          'ui segments',
          'main-segment-container',
          'main-page-segment-container',
          'main-paginated-page-segment-container'
        ]"
      >
        <InfoSegment
          :playlistData="pageSlotProps.profileData.playlist"
          :profileId="profileId"
        />

        <ImportSegment
          :playlistId="playlistId"
          :profileId="profileId"
        />

        <TracksSegment
          :profileId="profileId"
          :playlistId="playlistId"
          :playlistTitle="pageSlotProps.profileData.playlist.title"
        />
      </div>
    </template>
  </BasePlaylistPageContainer>
</template>

<script>
import BasePlaylistPageContainer
  from '@/containers/pages/profile/playlists/playlist/BasePlaylistPageContainer.vue'
import InfoSegment from './PlaylistPage/InfoSegment.vue'
import ImportSegment from './PlaylistPage/ImportSegment.vue'
import TracksSegment from './PlaylistPage/TracksSegment.vue'

export default {
  name: 'PlaylistPage',
  components: {
    BasePlaylistPageContainer,
    InfoSegment,
    ImportSegment,
    TracksSegment
  },
  props: {
    profileId: String,
    playlistId: String
  }
}
</script>

<style lang="sass" scoped></style>

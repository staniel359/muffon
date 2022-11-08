<template>
  <BaseProfilePlaylistPageContainer
    :profile-id="profileId"
    :playlist-id="playlistId"
  >
    <template #default="pageSlotProps">
      <div
        :class="[
          'ui raised segments',
          'main-segment-container',
          'main-page-segment-container'
        ]"
      >
        <InfoSegment
          :playlist-data="pageSlotProps.playlistData"
          :profile-id="profileId"
        />

        <TracksSegment
          :profile-id="profileId"
          :playlist-id="playlistId"
          :playlist-title="pageSlotProps.playlistTitle"
        />
      </div>
    </template>
  </BaseProfilePlaylistPageContainer>
</template>

<script>
import BaseProfilePlaylistPageContainer
  from '@/components/containers/pages/profile/playlist/BaseProfilePlaylistPageContainer.vue'
import InfoSegment from './PlaylistPage/InfoSegment.vue'
import TracksSegment from './PlaylistPage/TracksSegment.vue'

export default {
  name: 'PlaylistPage',
  components: {
    BaseProfilePlaylistPageContainer,
    InfoSegment,
    TracksSegment
  },
  props: {
    profileId: String,
    playlistId: String
  }
}
</script>

<style lang="sass" scoped></style>

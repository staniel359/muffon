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

        <ImportSegment
          v-if="isRenderImport"
          :playlist-id="playlistId"
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
  from '*/components/containers/pages/profile/playlist/BaseProfilePlaylistPageContainer.vue'
import InfoSegment from './PlaylistPage/InfoSegment.vue'
import ImportSegment from './PlaylistPage/ImportSegment.vue'
import TracksSegment from './PlaylistPage/TracksSegment.vue'
import {
  isCurrentProfile
} from '*/helpers/utils'

export default {
  name: 'PlaylistPage',
  components: {
    BaseProfilePlaylistPageContainer,
    InfoSegment,
    ImportSegment,
    TracksSegment
  },
  props: {
    profileId: String,
    playlistId: String
  },
  computed: {
    isRenderImport () {
      return isCurrentProfile(
        this.profileId
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>

<template>
  <BaseProfilePlaylistPageContainer
    :profileId="profileId"
    :playlistId="playlistId"
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
          :playlistData="pageSlotProps.playlistData"
          :profileId="profileId"
        />

        <ImportSegment
          v-if="isRenderImport"
          :playlistId="playlistId"
        />

        <TracksSegment
          class="main-paginated-page-segment-container"
          :profileId="profileId"
          :playlistId="playlistId"
          :playlistTitle="pageSlotProps.playlistTitle"
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
import { isCurrentProfile } from '*/helpers/utils'

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

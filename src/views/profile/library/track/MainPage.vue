<template>
  <BaseProfileLibraryTrackPageContainer
    :profile-id="profileId"
    :library-track-id="libraryTrackId"
  >
    <template #default="slotProps">
      <div class="main-profile-page-columns-container">
        <div
          :class="[
            'main-profile-page-left-column',
            'main-sticky-container'
          ]"
        >
          <InfoSegment
            :track-data="slotProps.trackData"
            :profile-id="profileId"
          />
        </div>

        <div class="main-profile-page-right-column">
          <StatisticsSegment
            :track-data="slotProps.trackData"
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
      </div>
    </template>
  </BaseProfileLibraryTrackPageContainer>
</template>

<script>
import BaseProfileLibraryTrackPageContainer
  from '*/components/containers/pages/profile/library/track/BaseProfileLibraryTrackPageContainer.vue'
import InfoSegment from './MainPage/InfoSegment.vue'
import StatisticsSegment from './MainPage/StatisticsSegment.vue'
import AlbumsSegment from './MainPage/AlbumsSegment.vue'
import PlaylistsSegment from './MainPage/PlaylistsSegment.vue'

export default {
  name: 'MainPage',
  components: {
    BaseProfileLibraryTrackPageContainer,
    InfoSegment,
    StatisticsSegment,
    AlbumsSegment,
    PlaylistsSegment
  },
  props: {
    profileId: String,
    libraryTrackId: String
  }
}
</script>

<style lang="sass" scoped></style>

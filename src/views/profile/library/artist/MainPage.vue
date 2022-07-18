<template>
  <BaseProfileLibraryArtistPageContainer
    :profile-id="profileId"
    :library-artist-id="libraryArtistId"
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
            :artist-data="slotProps.artistData"
            :profile-id="profileId"
          />
        </div>

        <div class="main-profile-page-right-column">
          <StatisticsSegment
            :artist-data="slotProps.artistData"
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
      </div>
    </template>
  </BaseProfileLibraryArtistPageContainer>
</template>

<script>
import BaseProfileLibraryArtistPageContainer
  from '*/components/containers/pages/profile/library/artist/BaseProfileLibraryArtistPageContainer.vue'
import InfoSegment from './MainPage/InfoSegment.vue'
import StatisticsSegment from './MainPage/StatisticsSegment.vue'
import AlbumsSegment from './MainPage/AlbumsSegment.vue'
import TracksSegment from './MainPage/TracksSegment.vue'
import PlaylistsSegment from './MainPage/PlaylistsSegment.vue'

export default {
  name: 'MainPage',
  components: {
    BaseProfileLibraryArtistPageContainer,
    InfoSegment,
    StatisticsSegment,
    AlbumsSegment,
    TracksSegment,
    PlaylistsSegment
  },
  props: {
    profileId: String,
    libraryArtistId: String
  }
}
</script>

<style lang="sass" scoped></style>

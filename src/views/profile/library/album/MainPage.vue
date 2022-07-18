<template>
  <BaseProfileLibraryAlbumPageContainer
    :profile-id="profileId"
    :library-album-id="libraryAlbumId"
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
            :album-data="slotProps.albumData"
            :profile-id="profileId"
          />
        </div>

        <div class="main-profile-page-right-column">
          <StatisticsSegment
            :album-data="slotProps.albumData"
          />

          <TracksSegment
            :profile-id="profileId"
            :library-album-id="libraryAlbumId"
          />

          <PlaylistsSegment
            :profile-id="profileId"
            :library-album-id="libraryAlbumId"
          />
        </div>
      </div>
    </template>
  </BaseProfileLibraryAlbumPageContainer>
</template>

<script>
import BaseProfileLibraryAlbumPageContainer
  from '*/components/containers/pages/profile/library/album/BaseProfileLibraryAlbumPageContainer.vue'
import InfoSegment from './MainPage/InfoSegment.vue'
import StatisticsSegment from './MainPage/StatisticsSegment.vue'
import TracksSegment from './MainPage/TracksSegment.vue'
import PlaylistsSegment from './MainPage/PlaylistsSegment.vue'

export default {
  name: 'MainPage',
  components: {
    BaseProfileLibraryAlbumPageContainer,
    InfoSegment,
    StatisticsSegment,
    TracksSegment,
    PlaylistsSegment
  },
  props: {
    profileId: String,
    libraryAlbumId: String
  }
}
</script>

<style lang="sass" scoped></style>

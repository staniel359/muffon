<template>
  <BaseProfileLibraryArtistPageContainer
    :profileId="profileId"
    :artistId="artistId"
  >
    <template #default="slotProps">
      <div class="main-library-page-columns-container">
        <div :class="[
          'main-library-page-left-column',
          'main-sticky-container'
        ]">
          <InfoSegment
            :artistData="slotProps.libraryArtistData"
            :profileId="profileId"
            :artistId="artistId"
          />
        </div>

        <div class="main-library-page-right-column">
          <StatisticsSegment
            :artistData="slotProps.libraryArtistData"
            :profileId="profileId"
            :artistId="artistId"
          />

          <AlbumsSegment
            :profileId="profileId"
            :artistId="artistId"
          />

          <TracksSegment
            :profileId="profileId"
            :artistId="artistId"
            :artistName="slotProps.artistName"
          />
        </div>
      </div>
    </template>
  </BaseProfileLibraryArtistPageContainer>
</template>

<script>
import BaseProfileLibraryArtistPageContainer
  from '@/containers/pages/profile/library/artist/BaseProfileLibraryArtistPageContainer.vue'
import InfoSegment from './MainPage/InfoSegment.vue'
import StatisticsSegment from './MainPage/StatisticsSegment.vue'
import AlbumsSegment from './MainPage/AlbumsSegment.vue'
import TracksSegment from './MainPage/TracksSegment.vue'

export default {
  name: 'MainPage',
  components: {
    BaseProfileLibraryArtistPageContainer,
    InfoSegment,
    StatisticsSegment,
    AlbumsSegment,
    TracksSegment
  },
  props: {
    profileId: String,
    artistId: String
  }
}
</script>

<style lang="sass" scoped></style>

<template>
  <BaseProfileLibraryArtistPageContainer
    :profileId="profileId"
    :artistId="artistId"
  >
    <template #default="slotProps">
      <div class="main-profile-page-columns-container">
        <div :class="[
          'main-profile-page-left-column',
          'main-sticky-container'
        ]">
          <InfoSegment
            :artistData="slotProps.libraryArtistData"
            :profileId="profileId"
            :artistId="artistId"
          />
        </div>

        <div class="main-profile-page-right-column">
          <StatisticsSegment
            :artistData="slotProps.libraryArtistData"
            :profileId="profileId"
            :artistId="artistId"
          />

          <AlbumsSegment
            :profileId="profileId"
            :artistId="artistId"
            :isWithFavoriteOption="isWithFavoriteOption"
          />

          <TracksSegment
            :profileId="profileId"
            :artistId="artistId"
            :artistName="slotProps.artistName"
            :isWithFavoriteOption="isWithFavoriteOption"
            :isWithDeleteOption="isWithDeleteOption"
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
import { isCurrentProfile } from '#/utils'

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
  },
  computed: {
    isWithFavoriteOption () {
      return isCurrentProfile(
        this.profileId
      )
    },
    isWithDeleteOption () {
      return isCurrentProfile(
        this.profileId
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>

<template>
  <BaseProfileLibraryArtistPageContainer
    :profile-id="profileId"
    :artist-id="artistId"
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
            :artist-data="slotProps.libraryArtistData"
            :profile-id="profileId"
            :artist-id="artistId"
          />
        </div>

        <div class="main-profile-page-right-column">
          <StatisticsSegment
            :artist-data="slotProps.libraryArtistData"
          />

          <AlbumsSegment
            :profile-id="profileId"
            :artist-id="artistId"
            :is-with-favorite-option="isWithFavoriteOption"
          />

          <TracksSegment
            :profile-id="profileId"
            :artist-id="artistId"
            :artist-name="slotProps.artistName"
            :is-with-favorite-option="isWithFavoriteOption"
            :is-with-delete-option="isWithDeleteOption"
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
import {
  isCurrentProfile
} from '*/helpers/utils'

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

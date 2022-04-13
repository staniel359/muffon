<template>
  <BaseProfileLibraryAlbumPageContainer
    :profile-id="profileId"
    :album-id="albumId"
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
            :album-data="slotProps.libraryAlbumData"
            :profile-id="profileId"
            :album-id="albumId"
          />
        </div>

        <div class="main-profile-page-right-column">
          <StatisticsSegment
            :album-data="slotProps.libraryAlbumData"
          />
          <TracksSegment
            :profile-id="profileId"
            :album-id="albumId"
            :is-with-favorite-option="isWithFavoriteOption"
            :is-with-delete-option="isWithDeleteOption"
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
import {
  isCurrentProfile
} from '*/helpers/utils'

export default {
  name: 'MainPage',
  components: {
    BaseProfileLibraryAlbumPageContainer,
    InfoSegment,
    StatisticsSegment,
    TracksSegment
  },
  props: {
    profileId: String,
    albumId: String
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

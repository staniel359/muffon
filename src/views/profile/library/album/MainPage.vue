<template>
  <BaseProfileLibraryAlbumPageContainer
    :profileId="profileId"
    :albumId="albumId"
  >
    <template #default="slotProps">
      <div class="main-profile-page-columns-container">
        <div :class="[
          'main-profile-page-left-column',
          'main-sticky-container'
        ]">
          <InfoSegment
            :albumData="slotProps.libraryAlbumData"
            :profileId="profileId"
            :albumId="albumId"
          />
        </div>

        <div class="main-profile-page-right-column">
          <StatisticsSegment
            :albumData="slotProps.libraryAlbumData"
            :profileId="profileId"
            :albumId="albumId"
          />
          <TracksSegment
            :profileId="profileId"
            :albumId="albumId"
            :isWithFavoriteOption="isWithFavoriteOption"
            :isWithDeleteOption="isWithDeleteOption"
          />
        </div>
      </div>
    </template>
  </BaseProfileLibraryAlbumPageContainer>
</template>

<script>
import BaseProfileLibraryAlbumPageContainer
  from '@/containers/pages/profile/library/album/BaseProfileLibraryAlbumPageContainer.vue'
import InfoSegment from './MainPage/InfoSegment.vue'
import StatisticsSegment from './MainPage/StatisticsSegment.vue'
import TracksSegment from './MainPage/TracksSegment.vue'
import { isCurrentProfile } from '#/utils'

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

<template>
  <BaseProfileLibraryTagPageContainer
    :profileId="profileId"
    :tagId="tagId"
  >
    <template #default="slotProps">
      <div class="main-profile-page-columns-container">
        <div :class="[
          'main-profile-page-left-column',
          'main-sticky-container'
        ]">
          <InfoSegment
            :tagData="slotProps.libraryTagData"
          />
        </div>

        <div class="main-profile-page-right-column">
          <StatisticsSegment
            :tagData="slotProps.libraryTagData"
            :profileId="profileId"
          />

          <ArtistsSegment
            :profileId="profileId"
            :tagId="tagId"
            :isWithFavoriteOption="isWithFavoriteOption"
          />
        </div>
      </div>
    </template>
  </BaseProfileLibraryTagPageContainer>
</template>

<script>
import BaseProfileLibraryTagPageContainer
  from '@/containers/pages/profile/library/tag/BaseProfileLibraryTagPageContainer.vue'
import InfoSegment from './MainPage/InfoSegment.vue'
import StatisticsSegment from './MainPage/StatisticsSegment.vue'
import ArtistsSegment from './MainPage/ArtistsSegment.vue'
import { isCurrentProfile } from '#/utils'

export default {
  name: 'MainPage',
  components: {
    BaseProfileLibraryTagPageContainer,
    InfoSegment,
    StatisticsSegment,
    ArtistsSegment
  },
  props: {
    profileId: String,
    tagId: String
  },
  computed: {
    isWithFavoriteOption () {
      return isCurrentProfile(
        this.profileId
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>

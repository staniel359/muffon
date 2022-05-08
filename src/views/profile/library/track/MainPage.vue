<template>
  <BaseProfileLibraryTrackPageContainer
    :profile-id="profileId"
    :library-track-id="libraryTrackId"
  >
    <template #default="pageSlotProps">
      <div class="main-profile-page-columns-container">
        <div
          :class="[
            'main-profile-page-left-column',
            'main-sticky-container'
          ]"
        >
          <InfoSegment
            :track-data="pageSlotProps.trackData"
            :profile-id="profileId"
          />
        </div>

        <div class="main-profile-page-right-column">
          <PlayerPanelSegment
            :track-data="pageSlotProps.trackData"
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
import PlayerPanelSegment from './MainPage/PlayerPanelSegment.vue'

export default {
  name: 'MainPage',
  components: {
    BaseProfileLibraryTrackPageContainer,
    InfoSegment,
    PlayerPanelSegment
  },
  props: {
    profileId: String,
    libraryTrackId: String
  }
}
</script>

<style lang="sass" scoped></style>

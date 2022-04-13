<template>
  <BaseProfileLibraryTrackPageContainer
    :profile-id="profileId"
    :track-id="trackId"
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
            :track-data="pageSlotProps.libraryTrackData"
            :profile-id="profileId"
            :track-id="trackId"
          />
        </div>

        <div class="main-profile-page-right-column">
          <PlayerPanelSegment
            :track-data="pageSlotProps.libraryTrackData"
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
    trackId: String
  }
}
</script>

<style lang="sass" scoped></style>

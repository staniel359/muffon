<template>
  <BaseProfileLibraryTrackPageContainer
    :profileId="profileId"
    :trackId="trackId"
  >
    <template #default="pageSlotProps">
      <div class="main-profile-page-columns-container">
        <div :class="[
          'main-profile-page-left-column',
          'main-sticky-container'
        ]">
          <InfoSegment
            :trackData="pageSlotProps.libraryTrackData"
            :profileId="profileId"
            :trackId="trackId"
          />
        </div>

        <div class="main-profile-page-right-column">
          <PlayerPanelSegment
            :trackData="pageSlotProps.libraryTrackData"
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

<template>
  <BaseProfileLibraryTrackPageContainer
    :profileId="profileId"
    :trackId="trackId"
  >
    <template #default="slotProps">
      <div class="main-library-page-columns-container">
        <div :class="[
          'main-library-page-left-column',
          'main-sticky-container'
        ]">
          <InfoSegment
            :trackData="slotProps.libraryTrackData"
            :profileId="profileId"
            :trackId="trackId"
          />
        </div>

        <div class="main-library-page-right-column">
          <PlayerPanelSegment
            :trackData="slotProps.libraryTrackData"
          />
        </div>
      </div>
    </template>
  </BaseProfileLibraryTrackPageContainer>
</template>

<script>
import BaseProfileLibraryTrackPageContainer
  from '@/containers/pages/profile/library/track/BaseProfileLibraryTrackPageContainer.vue'
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

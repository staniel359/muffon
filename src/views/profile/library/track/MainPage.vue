<template>
  <BaseProfileLibraryTrackPageContainer
    :profile-id="profileId"
    :library-track-id="libraryTrackId"
  >
    <template #default="slotProps">
      <div class="main-profile-page-columns-container">
        <LeftColumn
          :track-data="slotProps.trackData"
          :profile-id="profileId"
        />

        <RightColumn
          :track-data="slotProps.trackData"
          :profile-id="profileId"
          :library-track-id="libraryTrackId"
        />
      </div>
    </template>
  </BaseProfileLibraryTrackPageContainer>
</template>

<script>
import BaseProfileLibraryTrackPageContainer
  from '*/components/containers/pages/profile/library/track/BaseProfileLibraryTrackPageContainer.vue'
import LeftColumn from './MainPage/LeftColumn.vue'
import RightColumn from './MainPage/RightColumn.vue'

export default {
  name: 'MainPage',
  components: {
    BaseProfileLibraryTrackPageContainer,
    LeftColumn,
    RightColumn
  },
  props: {
    profileId: String,
    libraryTrackId: String
  }
}
</script>

<style lang="sass" scoped></style>

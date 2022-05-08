<template>
  <BaseProfileLibraryTagPageContainer
    :profile-id="profileId"
    :library-tag-id="libraryTagId"
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
            :tag-data="slotProps.tagData"
          />
        </div>

        <div class="main-profile-page-right-column">
          <StatisticsSegment
            :tag-data="slotProps.tagData"
          />

          <ArtistsSegment
            :profile-id="profileId"
            :library-tag-id="libraryTagId"
          />
        </div>
      </div>
    </template>
  </BaseProfileLibraryTagPageContainer>
</template>

<script>
import BaseProfileLibraryTagPageContainer
  from '*/components/containers/pages/profile/library/tag/BaseProfileLibraryTagPageContainer.vue'
import InfoSegment from './MainPage/InfoSegment.vue'
import StatisticsSegment from './MainPage/StatisticsSegment.vue'
import ArtistsSegment from './MainPage/ArtistsSegment.vue'

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
    libraryTagId: String
  }
}
</script>

<style lang="sass" scoped></style>

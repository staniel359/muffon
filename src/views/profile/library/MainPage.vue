<template>
  <BaseProfileLibraryPageContainer
    :profile-id="profileId"
  >
    <template
      #default="slotProps"
    >
      <div class="ui raised segments main-segment-container">
        <StatisticsSegment
          :library-data="slotProps.libraryData"
        />

        <ExtraSegment
          :profile-id="profileId"
        />
      </div>

      <ArtistsSegment
        :profile-id="profileId"
      />

      <AlbumsSegment
        :profile-id="profileId"
      />

      <TracksSegment
        :profile-id="profileId"
      />

      <TagsSegment
        :profile-id="profileId"
      />
    </template>
  </BaseProfileLibraryPageContainer>
</template>

<script>
import BaseProfileLibraryPageContainer
  from '@/components/containers/pages/profile/library/BaseProfileLibraryPageContainer.vue'
import StatisticsSegment from './MainPage/StatisticsSegment.vue'
import ExtraSegment from './MainPage/ExtraSegment.vue'
import ArtistsSegment from './MainPage/ArtistsSegment.vue'
import AlbumsSegment from './MainPage/AlbumsSegment.vue'
import TracksSegment from './MainPage/TracksSegment.vue'
import TagsSegment from './MainPage/TagsSegment.vue'

export default {
  name: 'MainPage',
  components: {
    BaseProfileLibraryPageContainer,
    StatisticsSegment,
    ExtraSegment,
    ArtistsSegment,
    AlbumsSegment,
    TracksSegment,
    TagsSegment
  },
  props: {
    profileId: String
  }
}
</script>

<style lang="sass" scoped></style>

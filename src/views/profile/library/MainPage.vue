<template>
  <BaseProfileLibraryPageContainer
    :profile-id="profileId"
  >
    <template #default="slotProps">
      <div
        :class="[
          'ui raised segments',
          'main-segment-container'
        ]"
      >
        <StatisticsSegment
          :library-data="slotProps.libraryData"
        />

        <ImportSegment
          v-if="isSelf"
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
  from '*/components/containers/pages/profile/library/BaseProfileLibraryPageContainer.vue'
import StatisticsSegment from './MainPage/StatisticsSegment.vue'
import ImportSegment from './MainPage/ImportSegment.vue'
import ArtistsSegment from './MainPage/ArtistsSegment.vue'
import AlbumsSegment from './MainPage/AlbumsSegment.vue'
import TracksSegment from './MainPage/TracksSegment.vue'
import TagsSegment from './MainPage/TagsSegment.vue'
import {
  isCurrentProfile
} from '*/helpers/utils'

export default {
  name: 'MainPage',
  components: {
    BaseProfileLibraryPageContainer,
    StatisticsSegment,
    ImportSegment,
    ArtistsSegment,
    AlbumsSegment,
    TracksSegment,
    TagsSegment
  },
  props: {
    profileId: {
      type: String,
      required: true
    }
  },
  computed: {
    isSelf () {
      return isCurrentProfile(
        this.profileId
      )
    }
  }
}
</script>

<style lang="sass" scoped></style>

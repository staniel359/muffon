<template>
  <BaseProfileLibraryPageContainer
    :profile-id="profileId"
  >
    <template #default="slotProps">
      <StatisticsSegment
        :library-data="slotProps.libraryData"
      />

      <ImportSegment
        v-if="isRenderImportSegment"
      />

      <ArtistsSegment
        :profile-id="profileId"
        :is-with-favorite-option="isWithFavoriteOption"
      />

      <AlbumsSegment
        :profile-id="profileId"
        :is-with-favorite-option="isWithFavoriteOption"
      />

      <TracksSegment
        :profile-id="profileId"
        :is-with-favorite-option="isWithFavoriteOption"
        :is-with-delete-option="isWithDeleteOption"
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
    profileId: String
  },
  computed: {
    isRenderImportSegment () {
      return isCurrentProfile(
        this.profileId
      )
    },
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

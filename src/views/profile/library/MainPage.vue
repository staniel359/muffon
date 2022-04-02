<template>
  <BaseProfileLibraryPageContainer
    :profileId="profileId"
  >
    <template #default="slotProps">
      <StatisticsSegment
        :libraryData="slotProps.libraryData"
        :profileId="profileId"
      />

      <ImportSegment
        v-if="isCurrentProfile(profileId)"
      />

      <ArtistsSegment
        :profileId="profileId"
        :isWithFavoriteOption="isWithFavoriteOption"
      />

      <AlbumsSegment
        :profileId="profileId"
        :isWithFavoriteOption="isWithFavoriteOption"
      />

      <TracksSegment
        :profileId="profileId"
        :isWithFavoriteOption="isWithFavoriteOption"
        :isWithDeleteOption="isWithDeleteOption"
      />

      <TagsSegment
        :profileId="profileId"
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
import { isCurrentProfile } from '*/helpers/utils'

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
  },
  methods: {
    isCurrentProfile
  }
}
</script>

<style lang="sass" scoped></style>

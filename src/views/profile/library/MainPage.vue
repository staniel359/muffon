<template>
  <BaseProfilePageContainer
    scope="library"
    pageNameKey="library"
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
    </template>
  </BaseProfilePageContainer>
</template>

<script>
import BaseProfilePageContainer
  from '@/containers/pages/profile/BaseProfilePageContainer.vue'
import StatisticsSegment from './MainPage/StatisticsSegment.vue'
import ImportSegment from './MainPage/ImportSegment.vue'
import ArtistsSegment from './MainPage/ArtistsSegment.vue'
import AlbumsSegment from './MainPage/AlbumsSegment.vue'
import TracksSegment from './MainPage/TracksSegment.vue'
import { isCurrentProfile } from '#/utils'

export default {
  name: 'MainPage',
  components: {
    BaseProfilePageContainer,
    StatisticsSegment,
    ImportSegment,
    ArtistsSegment,
    AlbumsSegment,
    TracksSegment
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

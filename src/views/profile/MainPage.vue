<template>
  <BaseProfilePageContainer
    :profileId="profileId"
  >
    <template #default="slotProps">
      <div class="main-profile-page-columns-container">
        <div :class="[
          'main-profile-page-left-column',
          'main-sticky-container'
        ]">
          <InfoSegment
            :profileData="slotProps.profileData"
          />
        </div>

        <div class="main-profile-page-right-column">
          <LibrarySegment
            :profileId="profileId"
          />

          <FavoritesSegment
            :profileId="profileId"
          />
        </div>
      </div>
    </template>
  </BaseProfilePageContainer>
</template>

<script>
import BaseProfilePageContainer
  from '@/containers/pages/profile/BaseProfilePageContainer.vue'
import InfoSegment from './MainPage/InfoSegment.vue'
import LibrarySegment from './MainPage/LibrarySegment.vue'
import FavoritesSegment from './MainPage/FavoritesSegment.vue'

export default {
  name: 'MainPage',
  components: {
    BaseProfilePageContainer,
    InfoSegment,
    LibrarySegment,
    FavoritesSegment
  },
  props: {
    profileId: String
  }
}
</script>

<style lang="sass" scoped></style>

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
            :profileNickname="slotProps.profileData.nickname"
          />

          <PlaylistsSegment
            :profileId="profileId"
          />

          <FavoritesSegment
            :profileId="profileId"
          />

          <PostsSegment
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
import PlaylistsSegment from './MainPage/PlaylistsSegment.vue'
import FavoritesSegment from './MainPage/FavoritesSegment.vue'
import PostsSegment from './MainPage/PostsSegment.vue'

export default {
  name: 'MainPage',
  components: {
    BaseProfilePageContainer,
    InfoSegment,
    LibrarySegment,
    PlaylistsSegment,
    FavoritesSegment,
    PostsSegment
  },
  props: {
    profileId: String
  }
}
</script>

<style lang="sass" scoped></style>

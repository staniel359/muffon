<template>
  <BaseProfilePageContainer
    :profile-id="profileId"
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
            :profile-data="slotProps.profileData"
          />
        </div>

        <div class="main-profile-page-right-column">
          <LibrarySegment
            :profile-id="profileId"
            :profile-nickname="slotProps.profileNickname"
          />

          <PlaylistsSegment
            :profile-id="profileId"
          />

          <FavoritesSegment
            :profile-id="profileId"
          />

          <CommunitiesSegment
            :profile-id="profileId"
          />

          <PostsSegment
            :profile-id="profileId"
          />
        </div>
      </div>
    </template>
  </BaseProfilePageContainer>
</template>

<script>
import BaseProfilePageContainer
  from '*/components/containers/pages/profile/BaseProfilePageContainer.vue'
import InfoSegment from './MainPage/InfoSegment.vue'
import LibrarySegment from './MainPage/LibrarySegment.vue'
import PlaylistsSegment from './MainPage/PlaylistsSegment.vue'
import FavoritesSegment from './MainPage/FavoritesSegment.vue'
import CommunitiesSegment from './MainPage/CommunitiesSegment.vue'
import PostsSegment from './MainPage/PostsSegment.vue'

export default {
  name: 'MainPage',
  components: {
    BaseProfilePageContainer,
    InfoSegment,
    LibrarySegment,
    PlaylistsSegment,
    FavoritesSegment,
    CommunitiesSegment,
    PostsSegment
  },
  props: {
    profileId: String
  }
}
</script>

<style lang="sass" scoped></style>

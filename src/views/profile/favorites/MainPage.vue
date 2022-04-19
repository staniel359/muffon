<template>
  <BaseProfileFavoritesPageContainer
    :profile-id="profileId"
  >
    <ArtistsSegment
      :profile-id="profileId"
    />

    <AlbumsSegment
      :profile-id="profileId"
    />

    <TracksSegment
      :profile-id="profileId"
    />
  </BaseProfileFavoritesPageContainer>
</template>

<script>
import BaseProfileFavoritesPageContainer
  from '*/components/containers/pages/profile/favorites/BaseProfileFavoritesPageContainer.vue'
import ArtistsSegment from './MainPage/ArtistsSegment.vue'
import AlbumsSegment from './MainPage/AlbumsSegment.vue'
import TracksSegment from './MainPage/TracksSegment.vue'

export default {
  name: 'MainPage',
  components: {
    BaseProfileFavoritesPageContainer,
    ArtistsSegment,
    AlbumsSegment,
    TracksSegment
  },
  props: {
    profileId: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="sass" scoped></style>
